"use client"

import { CombinedSchemaInput } from "@/components/multistep-form"
import { Badge } from "@/components/ui/badge"
import {
  Card,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { GetPreviewRecommendationsDocument } from "@/gql/graphql"
import { useDebounce } from "@/hooks"
import { useLazyQuery } from "@apollo/client/react"
import { useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form"

const DEBOUNCE_DELAY = 1500

function toPreferenceIds(values: unknown[] | undefined): number[] {
  return (values ?? []).map(Number).filter((id) => !Number.isNaN(id))
}

export default function Recommendations() {
  const [getRecommendations, { data, loading }] = useLazyQuery(
    GetPreviewRecommendationsDocument
  )
  const { watch } = useFormContext<CombinedSchemaInput>()

  const selectedGenres = watch("genrePreferences")
  const selectedTags = watch("tagPreferences")
  const debouncedGenres = useDebounce(selectedGenres, DEBOUNCE_DELAY)
  const debouncedTags = useDebounce(selectedTags, DEBOUNCE_DELAY)

  useEffect(() => {
    const genreIds = toPreferenceIds(debouncedGenres)
    const tagIds = toPreferenceIds(debouncedTags)

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
  }, [debouncedGenres, debouncedTags, getRecommendations])

  const recommendationsList = useMemo(() => {
    if (loading || !data) {
      return (
        <div className="scrollbar-hide flex items-center gap-4 overflow-x-auto pt-6 pb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-90 w-60 shrink-0 rounded-md" />
          ))}
        </div>
      )
    }

    return (
      <div className="scrollbar-hide flex items-center gap-4 overflow-x-auto pt-6 pb-4">
        {data.previewRecommendations.map((recommendation) => (
          <Card
            key={recommendation.id}
            className="relative h-90 w-60 shrink-0 rounded-md bg-cover bg-center"
            style={{
              backgroundImage: recommendation.coverUrl
                ? `url("${recommendation.coverUrl}")`
                : undefined,
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent">
              <Badge
                variant={"outline"}
                className="absolute top-4 right-4 rounded-sm border border-cyan-500 bg-cyan-950/90 text-cyan-500"
              >
                {recommendation.matchPercentage}% Match
              </Badge>
              <div className="absolute right-4 bottom-4 left-4">
                <h6 className="font-bold">{recommendation.titleEnglish}</h6>
                <p className="text-xs truncate">
                  {recommendation.genres?.join(" \u2022 ")}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }, [data, loading])

  return (
    <div className="pt-4">
      <h4 className="font-semibold">Projected Recommendations</h4>
      {recommendationsList}
    </div>
  )
}
