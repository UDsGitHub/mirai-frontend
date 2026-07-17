import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { CircleCheck } from "lucide-react"
import { FriendsActivityType } from "../../types"

type Props = {
  activity: FriendsActivityType
}

export default function ActivityCompleted({ activity }: Props) {
  return (
    <div className="h-[200px] w-[360px] shrink-0 rounded-md border border-border p-4">
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
            <div className={"flex items-center gap-1.5"}>
              <CircleCheck className="size-4 text-green-300" />
              <span className={"text-xs text-muted-foreground"}>Completed</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(activity.createdAt)}
        </span>
      </div>
    </div>
  )
}
