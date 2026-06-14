import { MAX_SELECTABLE_GENRES } from "@/components/multistep-form"

export type TasteAxisKind = "genre" | "tag"

export type TasteMatrixAxis = {
  id: number
  kind: TasteAxisKind
  label: string
}

export type TasteChartPoint = {
  label: string
  value: number
}

export type NormalizedPreview = {
  id: string
  titleEnglish: string | null
  titleRomaji: string
  coverUrl: string | null
  bannerUrl: string | null
  synopsis: string | null
  matchPercentage: number
  genreIds: number[]
  genreNames: string[]
  tagIds: number[]
  tagNames: string[]
}

const PREFERENCE_BASE = 70
const REINFORCEMENT_FACTOR = 30
const HIT_RATE_WEIGHT = 0.4
const WEIGHTED_HIT_RATE_WEIGHT = 0.6

export function pickMatrixAxes(
  genreIds: number[],
  tagIds: number[],
  genreLabels: Map<number, string>,
  tagLabels: Map<number, string>,
): TasteMatrixAxis[] {
  const genreAxes = genreIds.map((id) => ({
    id,
    kind: "genre" as const,
    label: genreLabels.get(id) ?? "",
  }))

  if (genreIds.length === MAX_SELECTABLE_GENRES) {
    return genreAxes
  }

  const tagAxes = tagIds
    .slice(0, MAX_SELECTABLE_GENRES - genreIds.length)
    .map((id) => ({
      id,
      kind: "tag" as const,
      label: tagLabels.get(id) ?? "",
    }))

  return [...genreAxes, ...tagAxes]
}

export function computeAxisValue(
  axis: TasteMatrixAxis,
  previews: NormalizedPreview[],
): number {
  if (previews.length === 0) {
    return PREFERENCE_BASE
  }

  let totalMatches = 0
  let weightedMatches = 0
  let totalMatchPercentages = 0

  for (const preview of previews) {
    const isHit =
      axis.kind === "genre"
        ? preview.genreIds.includes(axis.id)
        : preview.tagIds.includes(axis.id)

    if (isHit) {
      totalMatches++
      weightedMatches += preview.matchPercentage
    }
    totalMatchPercentages += preview.matchPercentage
  }

  const hitRate = totalMatches / previews.length
  const weightedHitRate =
    totalMatchPercentages > 0 ? weightedMatches / totalMatchPercentages : 0
  const blendedHitRate =
    hitRate * HIT_RATE_WEIGHT + weightedHitRate * WEIGHTED_HIT_RATE_WEIGHT

  return Math.round(PREFERENCE_BASE + blendedHitRate * REINFORCEMENT_FACTOR)
}

export function buildTasteChartData(
  axes: TasteMatrixAxis[],
  previews: NormalizedPreview[],
): TasteChartPoint[] {
  return axes.map((axis) => ({
    label: axis.label,
    value: computeAxisValue(axis, previews),
  }))
}
