import { Bookmark, Plus, Star } from "lucide-react"
import { FriendsActivityType } from "../../types"
import FriendsActivityCardHeader from "../FriendsActivityCardHeader"
import Image from "next/image"
import { ActivityVerb } from "@/constants/enums"
import { MAX_PREVIEW_TAGS } from "../../../preview-anime-section/constants"
import { Button } from "@/components/ui/button"
import { numericalAmountFormatter } from "@/utils/number"
import FriendsActivityCardWrapper from "../../FriendsActivityCardWrapper"

type Props = {
  activity: Extract<FriendsActivityType, { verb: ActivityVerb.ADDED_TO_LIST }>
}

export default function ActivityAddedToList({ activity }: Props) {
  const { userInfo, metadata } = activity
  const { animePreview } = metadata

  return (
    <FriendsActivityCardWrapper
      header={
        <FriendsActivityCardHeader
          avatarUrl={userInfo.avatarUrl}
          displayName={userInfo.displayName}
          createdAt={activity.createdAt}
          activityLabel={
            <div className={"flex items-center gap-1.5"}>
              <Bookmark className="size-4 text-blue-500" />
              <span className={"text-xs text-muted-foreground"}>
                Added to watchlist
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
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-bold">{animePreview.titleEnglish}</p>
          <span className="truncate text-xs font-medium text-muted-foreground">
            {animePreview.tagNames.slice(0, MAX_PREVIEW_TAGS).join(" ⋅ ")}
          </span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              <Star className="size-4 fill-yellow-300 stroke-none" />
              <span className="text-xs font-bold text-accent-foreground">
                {animePreview.rating}
              </span>
            </div>
            <span className="font-bold text-muted-foreground/50">&bull;</span>
            <span className="text-xs text-muted-foreground">
              {numericalAmountFormatter.format(animePreview.ratingCount)}{" "}
              ratings
            </span>
          </div>
          <Button variant={"ghost"} className="mt-auto">
            <Plus />
            <span>Save</span>
          </Button>
        </div>
      </div>
    </FriendsActivityCardWrapper>
  )
}
