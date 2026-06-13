import {
  CombinedSchemaInput,
  MAX_SELECTABLE_GENRES,
} from "@/components/multistep-form"
import { ChartConfig } from "@/components/ui/chart"
import {
  GenreInfoFragmentDoc,
  GetPreviewRecommendationsDocument,
  TagInfoFragmentDoc,
} from "@/gql/graphql"
import { useFragment } from "@/gql"
import { useDebounce } from "@/hooks"
import { useLazyQuery } from "@apollo/client/react"
import { useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form"

type RecommendationAxis = {
  id: number
  kind: "genre" | "tag"
}

type TasteAxis = {
  label: string
  value: number
}

const DEBOUNCE_DELAY = 1500
const PREFERENCE_BASE = 70
const REINFORCEMENT_FACTOR = 30
const HIT_RATE_WEIGHT = 0.4
const WEIGHTED_HIT_RATE_WEIGHT = 0.6

function toPreferenceIds(values: unknown[] | undefined): number[] {
  return (values ?? []).map(Number).filter((id) => !Number.isNaN(id))
}

function toTasteAxis(
  ids: number[],
  kind: "genre" | "tag"
): RecommendationAxis[] {
  return ids.map((id) => ({ id, kind }))
}

const chartConfig = {
  taste: {
    label: "Taste",
    color: "#06B6D4",
  },
} satisfies ChartConfig

export const useRecommendationState = () => {
  const [getRecommendations, { data, loading }] = useLazyQuery(
    GetPreviewRecommendationsDocument
  )
  const { watch } = useFormContext<CombinedSchemaInput>()

  const selectedGenres = watch("genrePreferences")
  const selectedTags = watch("tagPreferences")
  const genreIds = toPreferenceIds(useDebounce(selectedGenres, DEBOUNCE_DELAY))
  const tagIds = toPreferenceIds(useDebounce(selectedTags, DEBOUNCE_DELAY))

  useEffect(() => {
    if (genreIds.length === 0 && tagIds.length === 0) {
      return
    }

    getRecommendations({
      variables: {
        input: {
          genreIds,
          tagIds,
          limit: 6,
        },
      },
    })
  }, [genreIds, tagIds, getRecommendations])

  const chartData: TasteAxis[] = useMemo(() => {
    if (!data) {
      return []
    }

    const chartDataSet =
      genreIds.length === 6
        ? toTasteAxis(genreIds, "genre")
        : [
            ...toTasteAxis(genreIds, "genre"),
            ...toTasteAxis(
              tagIds.slice(0, MAX_SELECTABLE_GENRES - genreIds.length),
              "tag"
            ),
          ]

    return chartDataSet.map((preferenceSelection) => {
      let totalMatches = 0
      let weightedMatches = 0
      let totalMatchPercentages = 0
      let label = ""

      data.previewRecommendations.forEach((recommendation) => {
        let isHit = false

        if (preferenceSelection.kind === "genre") {
          const genre = recommendation.genres
            ?.map((item) => useFragment(GenreInfoFragmentDoc, item))
            .find((item) => item.id === preferenceSelection.id)
          label = genre?.name ?? label
          isHit = genre !== undefined
        } else {
          const tag = recommendation.tags
            ?.map((item) => useFragment(TagInfoFragmentDoc, item))
            .find((item) => item.id === preferenceSelection.id)
          label = tag?.name ?? label
          isHit = tag !== undefined
        }

        if (isHit) {
          totalMatches++
          weightedMatches += recommendation.matchPercentage
        }
        totalMatchPercentages += recommendation.matchPercentage
      })

      const previewCount = data.previewRecommendations.length
      const hitRate = previewCount > 0 ? totalMatches / previewCount : 0
      const weightedHitRate =
        totalMatchPercentages > 0
          ? weightedMatches / totalMatchPercentages
          : 0
      const blendedHitRate =
        hitRate * HIT_RATE_WEIGHT + weightedHitRate * WEIGHTED_HIT_RATE_WEIGHT

      return {
        label,
        value: Math.round(PREFERENCE_BASE + blendedHitRate * REINFORCEMENT_FACTOR),
      }
    })
  }, [data, genreIds, tagIds])

  return { data, loading, chartConfig, chartData }
}
