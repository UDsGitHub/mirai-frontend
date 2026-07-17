import { CircleCheck } from "lucide-react"
import { FriendsActivityType } from "../../types"
import FriendsActivityCardHeader from "../FriendsActivityCardHeader"

type Props = {
  activity: FriendsActivityType
}

export default function ActivityCompleted({ activity }: Props) {
  const { userInfo } = activity

  return (
    <div className="h-[200px] w-[360px] shrink-0 rounded-md border border-border p-4">
      <FriendsActivityCardHeader
        avatarUrl={userInfo.avatarUrl}
        displayName={userInfo.displayName}
        createdAt={activity.createdAt}
        activityLabel={
          <div className={"flex items-center gap-1.5"}>
            <CircleCheck className="size-4 text-green-300" />
            <span className={"text-xs text-muted-foreground"}>Completed</span>
          </div>
        }
      />
    </div>
  )
}
