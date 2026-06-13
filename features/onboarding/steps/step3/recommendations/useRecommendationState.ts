import {
  CombinedSchemaInput,
  MIN_SELECTABLE_GENRES,
  MIN_SELECTABLE_TAGS,
} from "@/components/multistep-form"
import {
  GenreInfoFragmentDoc,
  GetGenresDocument,
  GetPreviewRecommendationsDocument,
  GetPreviewRecommendationsQuery,
  GetTagsDocument,
  TagInfoFragmentDoc,
} from "@/gql/graphql"
import { getFragmentData } from "@/gql"
import { useDebounce } from "@/hooks"
import { useLazyQuery, useQuery } from "@apollo/client/react"
import { useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import {
  buildTasteChartData,
  NormalizedPreview,
  pickMatrixAxes,
  TasteChartPoint,
} from "./taste-matrix"

const DEBOUNCE_DELAY = 1500
const PREVIEW_LIMIT = 6

function toPreferenceIds(values: unknown[] | undefined): number[] {
  return (values ?? []).map(Number).filter((id) => !Number.isNaN(id))
}

function hasMinimumSelections(genreIds: number[], tagIds: number[]) {
  return (
    genreIds.length >= MIN_SELECTABLE_GENRES &&
    tagIds.length >= MIN_SELECTABLE_TAGS
  )
}

function normalizePreviews(
  recommendations: GetPreviewRecommendationsQuery["previewRecommendations"]
): NormalizedPreview[] {
  return recommendations.map((recommendation) => {
    const genres =
      recommendation.genres?.map((item) =>
        getFragmentData(GenreInfoFragmentDoc, item)
      ) ?? []
    const tags =
      recommendation.tags?.map((item) =>
        getFragmentData(TagInfoFragmentDoc, item)
      ) ?? []

    return {
      id: recommendation.id,
      titleRomaji: recommendation.titleRomaji,
      titleEnglish: recommendation.titleEnglish,
      coverUrl: recommendation.coverUrl,
      matchPercentage: recommendation.matchPercentage,
      genreIds: genres.map((genre) => genre.id),
      genreNames: genres.map((genre) => genre.name),
      tagIds: tags.map((tag) => tag.id),
      tagNames: tags.map((tag) => tag.name),
    }
  })
}

export const useRecommendationState = () => {
  const [getRecommendations, { data, loading }] = useLazyQuery(
    GetPreviewRecommendationsDocument
  )
  const { data: genreData } = useQuery(GetGenresDocument)
  const { data: tagData } = useQuery(GetTagsDocument)
  const { watch } = useFormContext<CombinedSchemaInput>()

  const genreIds = toPreferenceIds(
    useDebounce(watch("genrePreferences"), DEBOUNCE_DELAY)
  )
  const tagIds = toPreferenceIds(
    useDebounce(watch("tagPreferences"), DEBOUNCE_DELAY)
  )
  const liveGenreIds = toPreferenceIds(watch("genrePreferences"))
  const liveTagIds = toPreferenceIds(watch("tagPreferences"))

  const canFetch = hasMinimumSelections(genreIds, tagIds)
  const hasMinimumSelectionsLive = hasMinimumSelections(
    liveGenreIds,
    liveTagIds
  )

  useEffect(() => {
    if (!canFetch) {
      return
    }

    getRecommendations({
      variables: {
        input: {
          genreIds,
          tagIds,
          limit: PREVIEW_LIMIT,
        },
      },
    })
  }, [canFetch, genreIds, tagIds, getRecommendations])

  const genreLabels = useMemo(() => {
    const labels = new Map<number, string>()
    genreData?.genre.forEach((genre) => {
      const { id, name } = getFragmentData(GenreInfoFragmentDoc, genre)
      labels.set(id, name)
    })
    return labels
  }, [genreData])

  const tagLabels = useMemo(() => {
    const labels = new Map<number, string>()
    tagData?.tag.forEach((tag) => {
      const { id, name } = getFragmentData(TagInfoFragmentDoc, tag)
      labels.set(id, name)
    })
    return labels
  }, [tagData])

  const matrixAxes = useMemo(
    () => pickMatrixAxes(genreIds, tagIds, genreLabels, tagLabels),
    [genreIds, tagIds, genreLabels, tagLabels]
  )

  const previews = useMemo(
    () => (data ? normalizePreviews(data.previewRecommendations) : []),
    [data]
  )

  const chartData: TasteChartPoint[] = useMemo(() => {
    if (!canFetch || loading || previews.length === 0) {
      return []
    }

    return buildTasteChartData(matrixAxes, previews)
  }, [canFetch, loading, matrixAxes, previews])

  return {
    previews,
    loading,
    chartData,
    canFetch,
    hasMinimumSelections: hasMinimumSelectionsLive,
    selectionProgress: {
      genreCount: liveGenreIds.length,
      tagCount: liveTagIds.length,
      minGenres: MIN_SELECTABLE_GENRES,
      minTags: MIN_SELECTABLE_TAGS,
    },
  }
}
