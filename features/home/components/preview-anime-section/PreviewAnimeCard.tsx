import { Button } from "@/components/ui/button"
import { AnimePreviewCardType } from "./types"
import { Eye, Plus, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { BACKGROUND_COLORS } from "@/constants/style"
import { MAX_PREVIEW_TAGS } from "./constants"

type Props = {
  previewInfo: AnimePreviewCardType
}

export default function PreviewAnimeCard({ previewInfo }: Props) {
  const rankingBackgroundColor = previewInfo.ranking
    ? BACKGROUND_COLORS[(previewInfo.ranking - 1) % BACKGROUND_COLORS.length]
    : ""

  return (
    <div className="group flex w-[200px] shrink-0 flex-col gap-3 duration-500 ease-in-out hover:-translate-y-0.5">
      <div className="relative h-[280px] w-full cursor-pointer overflow-hidden rounded-md">
        <Image
          src={previewInfo.coverImage}
          alt={previewInfo.title}
          fill
          className="h-full w-full object-cover duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute top-1 flex w-full items-center justify-between px-1">
          <Badge className="bg-black/50">
            <Star className="size-4 fill-yellow-300 stroke-none" />
            <span className="text-xs font-bold text-accent-foreground">
              {previewInfo.rating}
            </span>
          </Badge>
          {previewInfo.ranking && (
            <Badge className={rankingBackgroundColor}>
              <TrendingUp />
              <span className={"text-xs font-bold"}>
                #{previewInfo.ranking}
              </span>
            </Badge>
          )}
        </div>
        <div className="absolute inset-0 bg-transparent duration-500 group-hover:bg-black/40" />
        <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 group-hover:flex">
          <Button
            variant={"outline"}
            className="size-10 cursor-pointer rounded-lg focus:scale-95 active:scale-95"
          >
            <Eye />
          </Button>
          <Button className="size-10 cursor-pointer rounded-lg bg-teal-200 duration-180 hover:bg-teal-400 focus:scale-95 focus:bg-teal-400 active:scale-95 active:bg-teal-400">
            <Plus />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-bold duration-300 group-hover:text-teal-200">
          {previewInfo.title}
        </span>
        <span className="truncate text-xs font-medium text-muted-foreground">
          {previewInfo.tags.slice(0, MAX_PREVIEW_TAGS).join(" ⋅ ")}
        </span>
      </div>
    </div>
  )
}
