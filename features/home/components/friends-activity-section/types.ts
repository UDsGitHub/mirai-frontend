import { ActivityVerb } from "@/constants/enums"
import { JSONValue } from "next/dist/server/config-shared"

type AnimePreview = {
  id: string
  titleEnglish: string
  coverUrl: string
  tagNames: string[]
}

export type ActivityMetaData = {
  [ActivityVerb.RATED]: {
    animePreview: AnimePreview
    rating: number
    content: string
  }
  [ActivityVerb.COMPLETED]: {
    animePreview: AnimePreview
  }
  [ActivityVerb.ADDED_TO_LIST]: {
    animePreview: AnimePreview
    isExistingWatchlistItem: boolean
  }
  [ActivityVerb.SHARED_REC]: {
    animePreview: AnimePreview
    content: string
  }
  [ActivityVerb.STARTED_DISCUSSION]: {
    title: string
  }
  [ActivityVerb.REPLIED_TO_DISCUSSION]: {
    title: string
  }
}

export type BaseActivity = {
  id: string
  userInfo: {
    id: string
    avatarUrl: string
    displayName: string
  }
  createdAt: Date
}

export type FriendsActivityType = {
  [K in ActivityVerb]: BaseActivity & {
    verb: K
    metadata: ActivityMetaData[K]
  }
}[ActivityVerb]
