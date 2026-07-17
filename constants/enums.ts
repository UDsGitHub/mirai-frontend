export enum ActivityVerb {
  RATED,
  COMPLETED,
  ADDED_TO_LIST,
  SHARED_REC,
  STARTED_DISCUSSION,
  REPLIED_TO_DISCUSSION,
}

export const ActivityVerbString: Record<keyof typeof ActivityVerb, string> = {
  RATED: "Rated",
  COMPLETED: "Completed",
  ADDED_TO_LIST: "Added to List",
  SHARED_REC: "Share",
  STARTED_DISCUSSION: "Started Discussion",
  REPLIED_TO_DISCUSSION: "Replied to Discussion",
}
