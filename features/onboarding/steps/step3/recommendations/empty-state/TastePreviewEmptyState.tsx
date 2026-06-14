import { useBoundedCursorFollow } from "@/hooks"
import { SquareLibrary, Tags } from "lucide-react"
import { motion } from "motion/react"
import { useRef } from "react"
import RadarPlaceholder from "./RadarPlaceholder"
import ProgressRow from "./ProgressRow"

type SelectionProgress = {
  genreCount: number
  tagCount: number
  minGenres: number
  minTags: number
}

export default function TastePreviewEmptyState({
  selectionProgress,
}: {
  selectionProgress: SelectionProgress
}) {
  const { genreCount, tagCount, minGenres, minTags } = selectionProgress
  const genresComplete = genreCount >= minGenres
  const tagsComplete = tagCount >= minTags
  const zoneRef = useRef<HTMLDivElement>(null)
  const { x: mouseX, y: mouseY } = useBoundedCursorFollow(zoneRef)

  return (
    <motion.div
      ref={zoneRef}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center gap-6 rounded-xl border border-dashed border-cyan-500/20 bg-cyan-500/4 px-6 py-8 text-center"
    >
      <RadarPlaceholder mousePosition={{ x: mouseX, y: mouseY }} />
      <div className="space-y-2">
        <h5 className="text-base font-semibold">Map your taste matrix</h5>
        <p className="max-w-xs text-sm text-muted-foreground">
          {genresComplete && tagsComplete
            ? "Almost there — Mirai is syncing to your selections."
            : "Choose at least 3 core genres and 3 taste tags to generate your live preview."}
        </p>
      </div>
      <div className="w-full max-w-xs space-y-4">
        <ProgressRow
          icon={<SquareLibrary className="size-4 text-cyan-400" />}
          label="Core genres"
          count={genreCount}
          min={minGenres}
        />
        <ProgressRow
          icon={<Tags className="size-4 text-purple-400" />}
          label="Taste tags"
          count={tagCount}
          min={minTags}
        />
      </div>
    </motion.div>
  )
}
