import { formatDistanceToNow } from "date-fns"
import { FriendsActivityType } from "../types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bookmark,
  CircleCheck,
  HeartHandshake,
  MessageSquareReply,
  MessageSquareText,
  Star,
} from "lucide-react"
import { useMemo } from "react"
import { ActivityVerb } from "@/constants/enums"

type Props = {
  activity: FriendsActivityType
}

export default function FriendsActivityCardHeader({ activity }: Props) {
  const activityVerbUI = useMemo(() => {
    const activityTextWrapperClass = "flex items-center gap-1.5"
    const activityTextClass = "text-xs text-muted-foreground"

    switch (activity.activityVerb) {
      case ActivityVerb.RATED:
        return (
          <div className={activityTextWrapperClass}>
            <Star className="size-4 fill-yellow-300 stroke-none" />
            <span className={activityTextClass}>Left a review</span>
          </div>
        )
      case ActivityVerb.COMPLETED:
        return (
          <div className={activityTextWrapperClass}>
            <CircleCheck className="size-4 text-green-300" />
            <span className={activityTextClass}>Completed</span>
          </div>
        )
      case ActivityVerb.ADDED_TO_LIST:
        return (
          <div className={activityTextWrapperClass}>
            <Bookmark className="size-4 text-blue-500" />
            <span className={activityTextClass}>Added to watchlist</span>
          </div>
        )
      case ActivityVerb.SHARED_REC:
        return (
          <div className={activityTextWrapperClass}>
            <HeartHandshake className="size-4 text-rose-500" />
            <span className={activityTextClass}>Shared a recommendation</span>
          </div>
        )
      case ActivityVerb.STARTED_DISCUSSION:
        return (
          <div className={activityTextWrapperClass}>
            <MessageSquareText className="size-4 text-muted-foreground" />
            <span className={activityTextClass}>Started a discussion</span>
          </div>
        )
      case ActivityVerb.REPLIED_TO_DISCUSSION:
        return (
          <div className={activityTextWrapperClass}>
            <MessageSquareReply className="size-4 text-muted-foreground" />
            <span className={activityTextClass}>Replied to discussion</span>
          </div>
        )
      default:
        throw Error("Invalid Activity Verb")
    }
  }, [activity.activityVerb])

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={activity.userInfo.avatarUrl} />
          <AvatarFallback>{activity.userInfo.displayName}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">
            {activity.userInfo.displayName}
          </p>
          {activityVerbUI}
        </div>
      </div>
      <span className="text-xs text-muted-foreground">
        {formatDistanceToNow(activity.createdAt)}
      </span>
    </div>
  )
}
