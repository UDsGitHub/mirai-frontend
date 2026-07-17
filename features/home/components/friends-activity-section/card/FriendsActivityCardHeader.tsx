import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ReactNode } from "react"

type Props = {
  avatarUrl: string
  displayName: string
  createdAt: Date
  activityLabel: ReactNode
}

export default function FriendsActivityCardHeader({ avatarUrl, displayName, createdAt, activityLabel }: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{displayName}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">
            {displayName}
          </p>
          {activityLabel}
        </div>
      </div>
      <span className="text-xs text-muted-foreground">
        {formatDistanceToNow(createdAt)}
      </span>
    </div>
  )
}
