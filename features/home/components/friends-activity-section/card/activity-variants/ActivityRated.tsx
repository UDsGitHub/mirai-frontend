import { Star } from "lucide-react"
import { FriendsActivityType } from "../../types"
import FriendsActivityCardHeader from "../FriendsActivityCardHeader"

type Props = {
  activity: FriendsActivityType
}

export default function ActivityRated({ activity }: Props) {
  const { userInfo } = activity

  return (
    <div className="h-[200px] w-[360px] shrink-0 rounded-md border border-border p-4">
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
    </div>
  )
}
