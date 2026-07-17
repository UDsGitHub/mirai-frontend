import { Button } from "@/components/ui/button"
import { AnimePreviewCardType } from "../types"
import { Plus } from "lucide-react"
import Image from "next/image"
import { MAX_PREVIEW_TAGS } from "../constants"
import { motion } from "motion/react"
import { ReactNode } from "react"
import DefaultHeader from "../headers/DefaultHeader"

type Props = {
  previewInfo: AnimePreviewCardType
  renderHeader?: (item: AnimePreviewCardType) => ReactNode
  animationDelay?: number
}

export default function DefaultCard({
  previewInfo,
  renderHeader,
  animationDelay,
}: Props) {
  const title = previewInfo.titleEnglish

  return (
    <div className="group relative cursor-pointer flex w-[200px] 2xl:w-[300px] shrink-0 flex-col gap-3 rounded-md duration-500 ease-in-out hover:-translate-y-1 has-focus-visible:-translate-y-0.5">
      <button
        type="button"
        aria-label={title}
        className="absolute inset-0 z-0 rounded-md focus-visible:outline-3 focus-visible:outline-teal-200/75"
      />

      <motion.div
        className="relative h-[280px] 2xl:h-[420px] w-full overflow-hidden rounded-md backface-hidden transform-3d"
        initial={{ opacity: 0, rotateY: 60 }}
        whileInView={{ opacity: 1, rotateY: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          type: "spring",
          duration: 1.5,
          delay: animationDelay,
        }}
      >
        <Image
          src={previewInfo.coverUrl ?? ""}
          alt={title}
          fill
          className="h-full w-full object-cover duration-500 ease-in-out group-hover:scale-105"
        />
        {renderHeader ? (
          renderHeader(previewInfo)
        ) : (
          <DefaultHeader rating={previewInfo.rating} />
        )}
        <div className="absolute inset-0 bg-transparent duration-500 group-hover:bg-black/40" />
        <div className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 group-hover:flex group-focus-within:flex">
          <Button
            type="button"
            aria-label={`Add ${title}`}
            className="relative size-10 cursor-pointer rounded-lg bg-teal-200 duration-180 hover:bg-teal-400 focus:scale-95 focus:bg-teal-400 active:scale-95 active:bg-teal-400"
          >
            <Plus />
          </Button>
        </div>
      </motion.div>
      <div className="relative flex flex-col gap-0.5 text-left">
        <span className="text-sm 2xl:text-xl font-bold duration-300 group-hover:text-teal-200">
          {title}
        </span>
        <span className="truncate text-xs 2xl:text-base font-medium text-muted-foreground">
          {previewInfo.tagNames?.slice(0, MAX_PREVIEW_TAGS).join(" ⋅ ")}
        </span>
      </div>
    </div>
  )
}
