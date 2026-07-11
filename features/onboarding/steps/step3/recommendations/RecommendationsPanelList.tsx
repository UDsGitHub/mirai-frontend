import { Skeleton } from "@/components/ui/skeleton"
import TastePreviewEmptyState from "./empty-state/TastePreviewEmptyState"
import RecommendationCard from "./recommendation-card/RecommendationCard"
import { NormalizedPreview } from "./taste-matrix"
import { SelectionProgress } from "./types"
import { useScrollContainer } from "react-indiana-drag-scroll"

const listClassName =
  "scrollbar-hide flex min-w-0 items-center gap-4 overflow-x-auto pb-4"

type Props = {
  loading: boolean
  previews: NormalizedPreview[]
  handleOpen: (preview: NormalizedPreview) => void
  selectionProgress: SelectionProgress
  hasMinimumSelections: boolean
}

export default function RecommendationsPanelList({
  loading,
  previews,
  handleOpen,
  selectionProgress,
  hasMinimumSelections,
}: Props) {
  const { ref: scrollRef } = useScrollContainer()

  if (loading) {
    return (
      <div className={listClassName} ref={scrollRef}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            className="aspect-2/3 w-60 shrink-0 rounded-md"
          />
        ))}
      </div>
    )
  }

  if (!hasMinimumSelections || previews.length === 0) {
    return <TastePreviewEmptyState selectionProgress={selectionProgress} />
  }

  return (
    <div className={listClassName} ref={scrollRef}>
      {previews.map((preview) => (
        <RecommendationCard
          key={preview.id}
          preview={preview}
          onClick={() => handleOpen(preview)}
        />
      ))}
    </div>
  )
}
