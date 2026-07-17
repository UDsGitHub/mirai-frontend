import { NormalizedPreview } from "@/features/onboarding/steps/step3/recommendations/taste-matrix"

export type AnimePreviewCardType = Partial<NormalizedPreview> & {
  titleEnglish: string
  rating: number
  ranking?: number
  matchPercentage?: number
  synopsis: string
  releaseDate: Date
  ratingCount: number
}
