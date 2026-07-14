import { Button } from "@/components/ui/button"
import { WatchlistSuggestionType } from "./types"
import { Eye, Plus } from "lucide-react"
import Image from "next/image"

type Props = {
  previewInfo: WatchlistSuggestionType
}

export default function WatchlistSuggestionCard({ previewInfo }: Props) {
  return (
    <div className="group flex w-[200px] shrink-0 flex-col gap-3 duration-500 ease-in-out hover:-translate-y-0.5">
      <div className="relative h-[280px] w-full cursor-pointer overflow-hidden rounded-md">
        <Image
          src={previewInfo.coverImage}
          alt={previewInfo.title}
          className="h-full w-full object-cover duration-500 ease-in-out group-hover:scale-105"
        />
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
          {previewInfo.tags.join(" ⋅ ")}
        </span>
      </div>
    </div>
  )
}
