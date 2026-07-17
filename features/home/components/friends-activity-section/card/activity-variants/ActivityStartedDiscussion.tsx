import { MessageSquareReply } from "lucide-react"
import { FriendsActivityType } from "../../types"
import FriendsActivityCardHeader from "../FriendsActivityCardHeader"
import { Button } from "@/components/ui/button"
import { ActivityVerb } from "@/constants/enums"
import FriendsActivityCardWrapper from "../../FriendsActivityCardWrapper"

type Props = {
  activity: Extract<
    FriendsActivityType,
    { verb: ActivityVerb.STARTED_DISCUSSION }
  >
}

export default function ActivityStartedDiscussion({ activity }: Props) {
  const { userInfo, metadata } = activity

  return (
    <FriendsActivityCardWrapper
      header={
        <FriendsActivityCardHeader
          avatarUrl={userInfo.avatarUrl}
          displayName={userInfo.displayName}
          createdAt={activity.createdAt}
          activityLabel={
            <div className={"flex items-center gap-1.5"}>
              <MessageSquareReply className="size-4 text-muted-foreground" />
              <span className={"text-xs text-muted-foreground"}>
                Started a discussion
              </span>
            </div>
          }
        />
      }
    >
      <div className="flex flex-1 flex-col gap-4">
        <div className="boder-border line-clamp-3 flex items-center rounded-sm border bg-muted p-2 text-sm font-semibold italic">
          <h3>{metadata.title}</h3>
        </div>
        <Button variant={'ghost'} className="mt-auto">Reply</Button>
      </div>
    </FriendsActivityCardWrapper>
  )
}
