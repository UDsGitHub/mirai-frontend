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

export enum AnimeStatusOptions {
  ANY = "*",
  CANCELLED = "CANCELLED",
  FINISHED = "FINISHED",
  HIATUS = "HIATUS",
  NOT_YET_RELEASED = "NOT_YET_RELEASED",
  RELEASING = "RELEASING",
}

export const AnimeStatusOptionStrings: Record<AnimeStatusOptions, string> = {
  [AnimeStatusOptions.ANY]: "Any Status",
  [AnimeStatusOptions.CANCELLED]: "Cancelled",
  [AnimeStatusOptions.FINISHED]: "Finished",
  [AnimeStatusOptions.HIATUS]: "Hiatus",
  [AnimeStatusOptions.NOT_YET_RELEASED]: "Not Yet Released",
  [AnimeStatusOptions.RELEASING]: "Releasing",
}

export enum AnimeFormatOptions {
  ANY = "*",
  MOVIE = "MOVIE",
  MUSIC = "MUSIC",
  ONA = "ONA",
  ONE_SHOT = "ONE_SHOT",
  OVA = "OVA",
  SPECIAL = "SPECIAL",
  TV = "TV",
  TV_SHORT = "TV_SHORT",
}

export const AnimeFormatOptionStrings: Record<AnimeFormatOptions, string> = {
  [AnimeFormatOptions.ANY]: "Any Format",
  [AnimeFormatOptions.MOVIE]: "Movie",
  [AnimeFormatOptions.MUSIC]: "Music",
  [AnimeFormatOptions.ONA]: "ONA",
  [AnimeFormatOptions.ONE_SHOT]: "One Shot",
  [AnimeFormatOptions.OVA]: "OVA",
  [AnimeFormatOptions.SPECIAL]: "Special",
  [AnimeFormatOptions.TV]: "TV",
  [AnimeFormatOptions.TV_SHORT]: "TV Short",
}

export enum AnimeSeasonOptions {
  ANY = "*",
  WINTER = "WINTER",
  SPRING = "SPRING",
  SUMMER = "SUMMER",
  FALL = "FALL",
}

export const AnimeSeasonOptionStrings: Record<AnimeSeasonOptions, string> = {
  [AnimeSeasonOptions.ANY]: "*",
  [AnimeSeasonOptions.WINTER]: "WINTER",
  [AnimeSeasonOptions.SPRING]: "SPRING",
  [AnimeSeasonOptions.SUMMER]: "SUMMER",
  [AnimeSeasonOptions.FALL]: "FALL",
}

export enum AnimeSortOptions {
  UPDATED_AT_DESC = "UPDATED_AT_DESC",
  START_DATE_DESC = "START_DATE_DESC",
  TRENDING_DESC = "TRENDING_DESC",
  FAVOURITES_DESC = "FAVOURITES_DESC",
  TITLE_ENGLISH = "TITLE_ENGLISH",
  SCORE_DESC = "SCORE_DESC",
  POPULARITY_DESC = "POPULARITY_DESC",
  EPISODES_DESC = "EPISODES_DESC",
}

export const AnimeSortOptionStrings: Record<AnimeSortOptions, string> = {
  [AnimeSortOptions.UPDATED_AT_DESC]: "Recently Updated",
  [AnimeSortOptions.START_DATE_DESC]: "Release Date",
  [AnimeSortOptions.TRENDING_DESC]: "Most Relevant",
  [AnimeSortOptions.FAVOURITES_DESC]: "Most Favourited",
  [AnimeSortOptions.TITLE_ENGLISH]: "Name A-Z",
  [AnimeSortOptions.SCORE_DESC]: "Scores",
  [AnimeSortOptions.POPULARITY_DESC]: "Popularity",
  [AnimeSortOptions.EPISODES_DESC]: "# of Episodes",
}

export enum AnimeCountryOptions {
  ANY = "*",
  JAPAN = "JAPAN",
  SOUTH_KOREA = "SOUTH_KOREA",
  CHINA = "CHINA",
  TAIWAN = "TAIWAN",
}

export const AnimeCountryOptionStrings: Record<AnimeCountryOptions, string> = {
  [AnimeCountryOptions.ANY]: "Any Country",
  [AnimeCountryOptions.JAPAN]: "Japan",
  [AnimeCountryOptions.SOUTH_KOREA]: "South Korea",
  [AnimeCountryOptions.CHINA]: "China",
  [AnimeCountryOptions.TAIWAN]: "Taiwan",
}
