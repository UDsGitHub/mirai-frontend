import {
  MIN_SELECTABLE_GENRES,
  MIN_SELECTABLE_TAGS,
} from "@/components/multistep-form"

export function toPreferenceIds(values: unknown[] | undefined): number[] {
  return (values ?? []).map(Number).filter((id) => !Number.isNaN(id))
}

export function hasMinimumSelections(genreIds: number[], tagIds: number[]) {
  return (
    genreIds.length >= MIN_SELECTABLE_GENRES &&
    tagIds.length >= MIN_SELECTABLE_TAGS
  )
}
