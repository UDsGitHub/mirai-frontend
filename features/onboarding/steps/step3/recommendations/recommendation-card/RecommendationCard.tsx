import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { NormalizedPreview } from "../taste-matrix"

type Props = {
  preview: NormalizedPreview
  onClick: () => void
}

export default function RecommendationCard({ preview, onClick }: Props) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onClick()
        }
      }}
      className="relative aspect-2/3 w-60 min-w-0 shrink-0 cursor-pointer overflow-hidden rounded-md bg-cover bg-center"
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
          {Math.round(preview.matchPercentage)}% Match
        </Badge>
        <div className="absolute right-4 bottom-4 left-4 min-w-0">
          <h6 className="truncate font-bold">
            {preview.titleEnglish ?? preview.titleRomaji}
          </h6>
          <p className="truncate text-xs">
            {preview.genreNames.join(" \u2022 ")}
          </p>
        </div>
      </div>
    </Card>
  )
}
