import { AnimePreviewCardType } from "../types"
import { Star } from "lucide-react"
import Image from "next/image"
import { MAX_PREVIEW_TAGS } from "../constants"
import { motion } from "motion/react"
import { numericalAmountFormatter } from "@/utils/number"

type Props = {
  previewInfo: AnimePreviewCardType
}

export default function ExpandedCard({ previewInfo }: Props) {
  return (
    <motion.button
      className="group flex shrink-0 cursor-pointer overflow-hidden rounded-md border border-border bg-primary-foreground/50 duration-500 ease-in-out hover:-translate-y-1 focus:-translate-y-0.5 focus:outline-3 focus:outline-teal-200/75"
      initial={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.36,
        ease: "easeOut",
      }}
    >
      <div className="h-[160px] w-[120px] cursor-pointer backface-hidden transform-3d">
        <Image
          src={previewInfo.coverUrl ?? ''}
          alt={previewInfo.titleEnglish}
          fill
          className="h-full w-full object-cover duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-3 p-4">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-bold duration-300 group-hover:text-teal-200">
              {previewInfo.titleEnglish}
            </span>
            <span className="text-xs">
              {previewInfo.releaseDate.getFullYear()}
            </span>
          </div>
          <span className="truncate pt-1 text-xs font-medium text-muted-foreground">
            {previewInfo.tagNames?.slice(0, MAX_PREVIEW_TAGS).join(" ⋅ ")}
          </span>
        </div>
        <p className="text-left text-xs text-accent-foreground">
          {previewInfo.synopsis}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              <Star className="size-4 fill-yellow-300 stroke-none" />
              <span className="text-xs font-bold text-accent-foreground">
                {previewInfo.rating}
              </span>
            </div>
            <span className="font-bold text-muted-foreground/50">&bull;</span>
            <span className="text-xs text-muted-foreground">
              {numericalAmountFormatter.format(previewInfo.ratingCount)} ratings
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}
