import { Bookmark, Plus, Star } from "lucide-react"
import { FriendsActivityType } from "../../types"
import FriendsActivityCardHeader from "../FriendsActivityCardHeader"
import Image from "next/image"
import { ActivityVerb } from "@/constants/enums"
import { MAX_PREVIEW_TAGS } from "../../../preview-anime-section/constants"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"

type Props = {
  activity: Extract<FriendsActivityType, { verb: ActivityVerb.ADDED_TO_LIST }>
}

export default function ActivityAddedToList({ activity }: Props) {
  const { userInfo, metadata } = activity
  const { animePreview } = metadata

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.36,
        ease: "easeOut",
      }}
      className="group flex h-[200px] w-[360px] shrink-0 flex-col gap-4 rounded-md border border-border p-4 duration-500 ease-in-out focus-within:-translate-y-0.5 hover:-translate-y-1"
    >
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
      <div className="flex-1 flex gap-4">
        <div className="relative h-full w-[70px] overflow-hidden rounded-md">
          <Image
            src={animePreview.coverUrl ?? ""}
            alt={animePreview.titleEnglish}
            fill
            className="h-full w-full object-cover duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-sm font-bold">{animePreview.titleEnglish}</p>
          <span className="truncate text-xs font-medium text-muted-foreground">
            {animePreview.tagNames.slice(0, MAX_PREVIEW_TAGS).join(" ⋅ ")}
          </span>
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-300 stroke-none" />
            <span className="flex items-center text-sm font-bold">9.4</span>
          </div>
          <Button variant={"outline"} className="mt-auto">
            <Plus />
            <span>Save</span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
