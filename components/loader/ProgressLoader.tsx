import { MIN_LOADER_MS } from "@/constants/loader"
import { motion } from "motion/react"

type Props = {
  /**
   * The duration of the loader in milliseconds.
   * @default MIN_LOADER_MS
   */
  duration?: number
}

export default function ProgressLoader({ duration = MIN_LOADER_MS }: Props) {
  return (
    <div className="h-1.5 overflow-hidden rounded-xl bg-muted-foreground/25">
      <motion.div
        className="h-full origin-left rounded-xl bg-linear-to-r from-cyan-500 to-purple-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: duration / 1000, ease: "easeInOut" }}
      />
    </div>
  )
}
