"use client"

import { MIN_LOADER_MS } from "@/constants/loader"
import ProgressLoader from "./ProgressLoader"
import { AnimatePresence, motion } from "motion/react"

type Props = {
  visible: boolean
}

export default function SplashPageLoader({ visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-background"
        >
          <div className="flex w-sm flex-col gap-2">
            <p className="text-center font-kihim text-4xl font-medium tracking-wider">
              MIRAI
            </p>
            <ProgressLoader duration={MIN_LOADER_MS} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
