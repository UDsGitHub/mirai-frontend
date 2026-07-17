import { useScrollContainer } from "react-indiana-drag-scroll"
import { AnimePreviewCardType } from "./types"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import PreviewAnimeCard from "./PreviewAnimeCard"
import { ReactNode } from "react"

type Props = {
  sectionTitle: ReactNode
  previewList: AnimePreviewCardType[]
  renderCardHeader?: (item: AnimePreviewCardType) => ReactNode
  useGrid?: boolean
  animationDelay?: number
}

export default function PreviewAnimeSection({
  sectionTitle,
  previewList,
  renderCardHeader,
  animationDelay,
  useGrid = false,
}: Props) {
  const { ref: scrollRef } = useScrollContainer()

  return (
    <div className="flex flex-col sm:gap-2">
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">{sectionTitle}</div>
        <Button variant={"link"} className="px-0 text-teal-200 sm:px-2">
          <span>View All</span>
          <ArrowRight />
        </Button>
      </div>
      <div
        className={
          useGrid
            ? "grid grid-cols-2 grid-rows-2 gap-4 pt-2"
            : "no-scrollbar flex w-full items-center gap-4 overflow-x-auto pt-2"
        }
        ref={scrollRef}
      >
        {previewList.map((item) => (
          <PreviewAnimeCard
            key={item.titleEnglish}
            previewInfo={item}
            animationDelay={animationDelay}
            renderHeader={renderCardHeader}
            isExpanded={useGrid}
          />
        ))}
      </div>
    </div>
  )
}
