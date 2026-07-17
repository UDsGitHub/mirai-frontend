import { AnimePreviewCardType } from "./types"
import { ReactNode } from "react"
import ExpandedCard from "./card/ExpandedCard"
import DefaultCard from "./card/DefaultCard"

type Props = {
  previewInfo: AnimePreviewCardType
  renderHeader?: (item: AnimePreviewCardType) => ReactNode
  animationDelay?: number
  isExpanded?: boolean
}

export default function PreviewAnimeCard({
  previewInfo,
  renderHeader,
  animationDelay,
  isExpanded = false,
}: Props) {
  return isExpanded ? (
    <ExpandedCard
      previewInfo={previewInfo}
    />
  ) : (
    <DefaultCard
      previewInfo={previewInfo}
      animationDelay={animationDelay}
      renderHeader={renderHeader}
    />
  )
}
