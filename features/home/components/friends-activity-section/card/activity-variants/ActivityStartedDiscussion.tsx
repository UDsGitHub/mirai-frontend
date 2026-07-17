import { MessageSquareText } from "lucide-react"
import { FriendsActivityType } from "../../types"
import FriendsActivityCardHeader from "../FriendsActivityCardHeader"

type Props = {
  activity: FriendsActivityType
}

export default function ActivityStartedDiscussion({ activity }: Props) {
  const { userInfo } = activity

  return (
    <div className="h-[200px] w-[360px] shrink-0 rounded-md border border-border p-4">
      <FriendsActivityCardHeader
        avatarUrl={userInfo.avatarUrl}
        displayName={userInfo.displayName}
        createdAt={activity.createdAt}
        activityLabel={
          <div className={"flex items-center gap-1.5"}>
            <MessageSquareText className="size-4 text-muted-foreground" />
            <span className={"text-xs text-muted-foreground"}>
              Started a discussion
            </span>
          </div>
        }
      />
    </div>
  )
}
