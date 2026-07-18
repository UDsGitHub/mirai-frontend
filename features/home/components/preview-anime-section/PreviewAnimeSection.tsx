import { useScrollContainer } from "react-indiana-drag-scroll"
import { AnimePreviewCardType } from "./types"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import PreviewAnimeCard from "./PreviewAnimeCard"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

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
    <div className="flex min-w-0 flex-col items-start sm:items-stretch sm:gap-2">
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">{sectionTitle}</div>
        <Button
          variant={"link"}
          className={cn(
            "px-0 text-teal-500 sm:px-2 dark:text-teal-200",
            useGrid ? "hidden sm:flex" : "hidden"
          )}
        >
          <span>View All</span>
          <ArrowRight />
        </Button>
      </div>
      <div
        className={
          useGrid
            ? "grid grid-cols-1 grid-rows-2 gap-4 pt-2 sm:grid-cols-2 3xl:gap-6"
            : "scrollbar-hide flex w-full min-w-0 items-center gap-4 overflow-x-auto pt-2 3xl:gap-6"
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
      <Button
        variant={"link"}
        className={cn(
          "px-0 text-teal-500 sm:px-2 dark:text-teal-200",
          useGrid ? "flex sm:hidden" : "hidden"
        )}
      >
        <span>View All</span>
        <ArrowRight />
      </Button>
    </div>
  )
}
