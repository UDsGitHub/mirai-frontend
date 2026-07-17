import { FriendsActivityType } from "../types"
import { ActivityVerb } from "@/constants/enums"
import ActivityRated from "./activity-variants/ActivityRated"
import ActivityCompleted from "./activity-variants/ActivityCompleted"
import ActivityAddedToList from "./activity-variants/ActivityAddedToList"
import ActivitySharedRecommendation from "./activity-variants/ActivitySharedRecommendation"
import ActivityStartedDiscussion from "./activity-variants/ActivityStartedDiscussion"
import ActivityRepliedToDiscussion from "./activity-variants/ActivityRepliedToDiscussion"

type Props = {
  activity: FriendsActivityType
}

export default function FriendsActivityCard({ activity }: Props) {
  switch (activity.verb) {
    case ActivityVerb.RATED:
      return <ActivityRated activity={activity} />
    case ActivityVerb.COMPLETED:
      return <ActivityCompleted activity={activity} />
    case ActivityVerb.ADDED_TO_LIST:
      return <ActivityAddedToList activity={activity} />
    case ActivityVerb.SHARED_REC:
      return <ActivitySharedRecommendation activity={activity} />
    case ActivityVerb.STARTED_DISCUSSION:
      return <ActivityStartedDiscussion activity={activity} />
    case ActivityVerb.REPLIED_TO_DISCUSSION:
      return <ActivityRepliedToDiscussion activity={activity} />
    default:
      throw Error("Invalid Activity Verb")
  }
}
