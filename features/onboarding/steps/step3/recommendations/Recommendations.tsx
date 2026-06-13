"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "motion/react"
import { useMemo } from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import TastePreviewEmptyState from "./empty-state/TastePreviewEmptyState"
import { useRecommendationState } from "./useRecommendationState"

const chartConfig = {
  value: {
    label: "Taste",
    color: "#06B6D4",
  },
} satisfies ChartConfig

export default function Recommendations() {
  const {
    previews,
    loading,
    chartData,
    hasMinimumSelections,
    selectionProgress,
  } = useRecommendationState()

  const chartKey = chartData.map((point) => point.label).join("|")

  const recommendationsList = useMemo(() => {
    if (!hasMinimumSelections) {
      return <TastePreviewEmptyState selectionProgress={selectionProgress} />
    }

    if (loading || previews.length === 0) {
      return (
        <div className="scrollbar-hide flex items-center gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-90 w-60 shrink-0 rounded-md" />
          ))}
        </div>
      )
    }

    return (
      <div className="scrollbar-hide flex items-center gap-4 overflow-x-auto pb-4">
        {previews.map((preview) => (
          <Card
            key={preview.id}
            className="relative h-90 w-60 shrink-0 rounded-md bg-cover bg-center"
            style={{
              backgroundImage: preview.coverUrl
                ? `url("${preview.coverUrl}")`
                : undefined,
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent">
              <Badge
                variant={"outline"}
                className="absolute top-4 right-4 rounded-sm border border-cyan-500 bg-cyan-950/90 text-cyan-500"
              >
                {preview.matchPercentage}% Match
              </Badge>
              <div className="absolute right-4 bottom-4 left-4">
                <h6 className="font-bold">
                  {preview.titleEnglish ?? preview.titleRomaji}
                </h6>
                <p className="truncate text-xs">
                  {preview.genreNames.join(" \u2022 ")}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }, [hasMinimumSelections, loading, previews, selectionProgress])

  return (
    <div className="pt-4">
      <h4 className="pb-5 font-semibold">Projected Recommendations</h4>
      {recommendationsList}
      {chartData.length > 0 && (
        <motion.div
          key={chartKey}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="label" />
              <PolarGrid />
              <Radar
                dataKey="value"
                fill="var(--color-value)"
                fillOpacity={0.6}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
              />
            </RadarChart>
          </ChartContainer>
        </motion.div>
      )}
    </div>
  )
}
