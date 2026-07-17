import { ActivityVerb } from "@/constants/enums"

type AnimePreview = {
  id: string
  titleEnglish: string
  coverUrl: string
  tagNames: string[]
  rating: number
  ratingCount: number
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
    content: string
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
