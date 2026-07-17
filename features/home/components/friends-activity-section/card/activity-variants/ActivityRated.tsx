import { Star } from "lucide-react"
import { FriendsActivityType } from "../../types"
import FriendsActivityCardHeader from "../FriendsActivityCardHeader"
import Image from "next/image"
import { ActivityVerb } from "@/constants/enums"
import { MAX_PREVIEW_TAGS } from "../../../preview-anime-section/constants"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getColorByRating } from "@/utils/color"
import FriendsActivityCardWrapper from "../../FriendsActivityCardWrapper"
import { Button } from "@/components/ui/button"

type Props = {
  activity: Extract<FriendsActivityType, { verb: ActivityVerb.RATED }>
}

export default function ActivityRated({ activity }: Props) {
  const { userInfo, metadata } = activity
  const { content, rating, animePreview } = metadata

  return (
    <FriendsActivityCardWrapper
      header={
        <FriendsActivityCardHeader
          avatarUrl={userInfo.avatarUrl}
          displayName={userInfo.displayName}
          createdAt={activity.createdAt}
          activityLabel={
            <div className={"flex items-center gap-1.5"}>
              <Star className="size-4 fill-yellow-300 stroke-none" />
              <span className={"text-xs text-muted-foreground"}>
                Left a review
              </span>
            </div>
          }
        />
      }
    >
      <div className="flex flex-1 gap-4">
      <div className="relative h-full w-[100px] overflow-hidden rounded-md">
          <Image
            src={animePreview.coverUrl ?? ""}
            alt={animePreview.titleEnglish}
            fill
            className="h-full w-full object-cover duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-sm font-bold">{animePreview.titleEnglish}</p>
          <span className="truncate text-xs font-medium text-muted-foreground">
            {animePreview.tagNames.slice(0, MAX_PREVIEW_TAGS).join(" ⋅ ")}
          </span>
          <div className="flex items-center gap-1">
            <Badge className="flex gap-1" variant={"outline"}>
              <span className="text-xs font-semibold text-muted-foreground">
                Rated
              </span>
              <span className="font-bold text-muted-foreground/50">&bull;</span>
              <span
                className={cn("text-xs font-bold", getColorByRating(rating))}
              >
                {rating}
              </span>
            </Badge>
          </div>
          <q className="line-clamp-2 text-xs italic">{content}</q>
          <Button variant={"ghost"} className="mt-auto">
            View
          </Button>
        </div>
      </div>
    </FriendsActivityCardWrapper>
  )
}
