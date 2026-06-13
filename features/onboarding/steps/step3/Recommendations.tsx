"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useMemo } from "react"
import { useRecommendationState } from "./useRecommendationState"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { RadarChart, PolarAngleAxis, PolarGrid, Radar } from "recharts"

export default function Recommendations() {
  const { data, loading, chartConfig, chartData } = useRecommendationState()

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
                <p className="truncate text-xs">
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
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart data={chartData}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="month" />
          <PolarGrid />
          <Radar
            dataKey="taste"
            fill="#06B6D4"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1,
            }}
          />
        </RadarChart>
      </ChartContainer>
    </div>
  )
}
