"use client"

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
import RecommendationCard from "./RecommendationCard"
import { Dialog } from "@/components/ui/dialog"
import { useRecommendationDialog } from "./useRecommendationDialog"
import RecommendationDialogCard from "./RecommendationDialogCard"

const chartConfig = {
  value: {
    label: "Taste",
    color: "#06B6D4",
  },
} satisfies ChartConfig

export default function RecommendationsPanel() {
  const {
    previews,
    loading,
    chartData,
    hasMinimumSelections,
    selectionProgress,
  } = useRecommendationState()
  const { selectedPreview, handleOpen, handleClose } = useRecommendationDialog()

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
          <RecommendationCard
            key={preview.id}
            preview={preview}
            onClick={() => handleOpen(preview)}
          />
        ))}
      </div>
    )
  }, [hasMinimumSelections, loading, previews, selectionProgress, handleOpen])

  return (
    <div className="pt-4">
      <Dialog
        open={!!selectedPreview}
        onOpenChange={(open) => {
          if (!open) {
            handleClose()
          }
        }}
      >
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
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
        <RecommendationDialogCard preview={selectedPreview} />
      </Dialog>
    </div>
  )
}
