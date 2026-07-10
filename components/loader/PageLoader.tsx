"use client"

import { MIN_LOADER_MS } from "@/constants/loader"
import ProgressLoader from "./ProgressLoader"

export default function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-sm flex flex-col gap-2">
        <p className="text-center font-kihim text-4xl font-medium tracking-wider">
          MIRAI
        </p>
        <ProgressLoader duration={MIN_LOADER_MS} />
      </div>
    </div>
  )
}
