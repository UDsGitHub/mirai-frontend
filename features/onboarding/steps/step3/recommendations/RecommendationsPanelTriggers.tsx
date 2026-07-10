import { Button } from "@/components/ui/button"
import { DrawerTrigger } from "@/components/ui/drawer"
import { SquareLibrary, Tags } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { RecommendationsPanelTrigger, SelectionProgress } from "./types"
import ProgressRow from "./empty-state/ProgressRow"
import {
  MIN_SELECTABLE_GENRES,
  MIN_SELECTABLE_TAGS,
} from "@/components/multistep-form/validators"

type Props = {
  canTrigger: boolean
  selectionProgress: SelectionProgress
  onTriggerChange: (trigger: RecommendationsPanelTrigger) => void
}

export default function RecommendationsPanelTriggers({
  canTrigger,
  selectionProgress,
  onTriggerChange,
}: Props) {
  return (
    <div className="sticky top-0 z-10 flex justify-end gap-2 rounded-br-xl rounded-bl-xl border-b border-border bg-background px-[6%] pt-6">
      <div className="flex w-full flex-col gap-2">
        <p className="text-sm text-muted-foreground">AI Taste Preview</p>
        <div className="flex w-full flex-col">
          <div className="flex items-center gap-8 pb-4">
            <div className="flex-1">
              <ProgressRow
                icon={<SquareLibrary className="size-4 text-cyan-400" />}
                label="Core genres"
                count={selectionProgress.genreCount}
                min={MIN_SELECTABLE_GENRES}
              />
            </div>
            <div className="flex-1">
              <ProgressRow
                icon={<Tags className="size-4 text-purple-400" />}
                label="Taste tags"
                count={selectionProgress.tagCount}
                min={MIN_SELECTABLE_TAGS}
              />
            </div>
          </div>
          <AnimatePresence initial={false}>
            {canTrigger && (
              <motion.div
                key="preview-actions"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <DrawerTrigger
                    asChild
                    onClick={() => onTriggerChange("chart")}
                  >
                    <Button
                      size="sm"
                      className="rounded-lg border border-cyan-500 bg-transparent text-cyan-500 active:bg-cyan-500/20"
                    >
                      View chart
                    </Button>
                  </DrawerTrigger>
                  <DrawerTrigger
                    asChild
                    onClick={() => onTriggerChange("list")}
                  >
                    <Button
                      size="sm"
                      className="rounded-lg border border-cyan-500 bg-cyan-500 text-background active:bg-cyan-500/20"
                    >
                      View recommendations
                    </Button>
                  </DrawerTrigger>
                </div>
                <div className="h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
