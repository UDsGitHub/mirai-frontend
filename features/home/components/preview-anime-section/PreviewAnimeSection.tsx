import { useScrollContainer } from "react-indiana-drag-scroll"
import { AnimePreviewCardType } from "./types"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import PreviewAnimeCard from "./PreviewAnimeCard"
import { ReactNode } from "react"

type Props = {
  sectionTitle: ReactNode
  previewList: AnimePreviewCardType[]
}

export default function PreviewAnimeSection({
  sectionTitle,
  previewList,
}: Props) {
  const { ref: scrollRef } = useScrollContainer()

  return (
    <div className="flex flex-col sm:gap-2">
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          {sectionTitle}
        </div>
        <Button variant={"link"} className="px-0 text-teal-200 sm:px-2">
          <span>View All</span>
          <ArrowRight />
        </Button>
      </div>
      <div
        className="no-scrollbar flex w-full items-center gap-4 overflow-x-auto py-4"
        ref={scrollRef}
      >
        {previewList.map((item) => (
          <PreviewAnimeCard key={item.title} previewInfo={item} />
        ))}
      </div>
    </div>
  )
}
