import { ChevronRight, MessageSquareReply } from "lucide-react"
import { FriendsActivityType } from "../../types"
import FriendsActivityCardHeader from "../FriendsActivityCardHeader"
import { Button } from "@/components/ui/button"
import { ActivityVerb } from "@/constants/enums"
import FriendsActivityCardWrapper from "../../FriendsActivityCardWrapper"

type Props = {
  activity: Extract<
    FriendsActivityType,
    { verb: ActivityVerb.REPLIED_TO_DISCUSSION }
  >
}

export default function ActivityRepliedToDiscussion({ activity }: Props) {
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
                Replied to discussion
              </span>
            </div>
          }
        />
      }
    >
      <div className="flex flex-1 flex-col gap-4">
        <div className="boder-border flex flex-col items-center rounded-sm border bg-muted p-2">
          <h3 className="line-clamp-1 text-xs font-semibold text-muted-foreground italic">
            {metadata.title}
          </h3>
          <q className="line-clamp-2 text-sm">{metadata.content}</q>
        </div>
        <Button variant={"ghost"} className="mt-auto">
          <span>Check it out</span>
          <ChevronRight />
        </Button>
      </div>
    </FriendsActivityCardWrapper>
  )
}
