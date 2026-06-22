import RecommendationsPanelChart from "./RecommendationsPanelChart"
import RecommendationsPanelList from "./RecommendationsPanelList"
import { RecommendationsPanelTrigger } from "./types"
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge"
import { useRecommendationState } from "./useRecommendationState"
import { useRecommendationDialog } from "./useRecommendationDialog"
import RecommendationDrawerCard from "./recommendation-card/RecommendationDrawerCard"

type Props = {
  trigger: RecommendationsPanelTrigger
}

export default function RecommendationsPanelMobile({ trigger }: Props) {
  const {
    previews,
    loading,
    chartData,
    hasMinimumSelections,
    selectionProgress,
  } = useRecommendationState()
  const { selectedPreview, handleOpen } = useRecommendationDialog()

  if (!trigger) {
    return null
  }

  return (
    <>
      {trigger === "chart" ? (
        <DrawerContent className="px-6 pb-6">
          <DrawerHeader>
            <DrawerTitle>Taste Preview</DrawerTitle>
            <DrawerDescription>
              <Badge variant={"secondary"}>
                <div className="h-1 w-1 animate-pulse rounded-full bg-cyan-300" />
                <span>Adapting to your picks</span>
              </Badge>
            </DrawerDescription>
          </DrawerHeader>
          <RecommendationsPanelChart loading={loading} chartData={chartData} />
        </DrawerContent>
      ) : (
        <DrawerContent className="px-6 pb-6">
          <DrawerHeader>
            <DrawerTitle>Recommended Anime</DrawerTitle>
          </DrawerHeader>
          <RecommendationsPanelList
            loading={loading}
            previews={previews}
            handleOpen={handleOpen}
            selectionProgress={selectionProgress}
            hasMinimumSelections={hasMinimumSelections}
          />
        </DrawerContent>
      )}
      <RecommendationDrawerCard preview={selectedPreview} />
    </>
  )
}
