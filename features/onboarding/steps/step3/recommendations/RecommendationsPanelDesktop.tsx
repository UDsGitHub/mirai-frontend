"use client"

import { Dialog } from "@/components/ui/dialog"
import { useRecommendationState } from "./useRecommendationState"
import { useRecommendationDialog } from "./useRecommendationDialog"
import RecommendationDialogCard from "./recommendation-card/RecommendationDialogCard"
import RecommendationsPanelChart from "./RecommendationsPanelChart"
import RecommendationsPanelList from "./RecommendationsPanelList"

export default function RecommendationsPanelDesktop() {
  const {
    previews,
    loading,
    chartData,
    hasMinimumSelections,
    selectionProgress,
  } = useRecommendationState()
  const { selectedPreview, handleOpen, handleClose } = useRecommendationDialog()

  return (
    <div className="min-w-0 pt-4">
      <h4 className="pb-5 font-semibold">Projected Recommendations</h4>
      <RecommendationsPanelList
        loading={loading}
        previews={previews}
        handleOpen={handleOpen}
        selectionProgress={selectionProgress}
        hasMinimumSelections={hasMinimumSelections}
      />
      {chartData.length > 0 && (
        <RecommendationsPanelChart loading={loading} chartData={chartData} />
      )}
      <Dialog
        open={!!selectedPreview}
        onOpenChange={(open) => {
          if (!open) {
            handleClose()
          }
        }}
      >
        <RecommendationDialogCard preview={selectedPreview} />
      </Dialog>
    </div>
  )
}
