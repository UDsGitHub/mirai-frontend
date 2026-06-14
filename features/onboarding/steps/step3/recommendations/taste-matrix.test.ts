import { describe, expect, it } from "vitest"
import {
  buildTasteChartData,
  computeAxisValue,
  NormalizedPreview,
  pickMatrixAxes,
  TasteMatrixAxis,
} from "./taste-matrix"

function makePreview(
  overrides: Partial<NormalizedPreview> = {}
): NormalizedPreview {
  return {
    id: "preview-1",
    titleEnglish: "Test Anime",
    titleRomaji: "Test",
    coverUrl: null,
    bannerUrl: null,
    synopsis: null,
    matchPercentage: 80,
    genreIds: [1],
    genreNames: ["Action"],
    tagIds: [10],
    tagNames: ["Isekai"],
    ...overrides,
  }
}

describe("pickMatrixAxes", () => {
  const genreLabels = new Map([
    [1, "Action"],
    [2, "Fantasy"],
    [3, "Comedy"],
    [4, "Drama"],
    [5, "Romance"],
    [6, "Sci-Fi"],
  ])
  const tagLabels = new Map([
    [10, "Isekai"],
    [11, "School"],
    [12, "Magic"],
  ])

  it("returns only genres when six genres are selected", () => {
    const axes = pickMatrixAxes(
      [1, 2, 3, 4, 5, 6],
      [10, 11, 12],
      genreLabels,
      tagLabels
    )

    expect(axes).toHaveLength(6)
    expect(axes.every((axis) => axis.kind === "genre")).toBe(true)
    expect(axes.map((axis) => axis.label)).toEqual([
      "Action",
      "Fantasy",
      "Comedy",
      "Drama",
      "Romance",
      "Sci-Fi",
    ])
  })

  it("fills remaining slots with tags up to six axes", () => {
    const axes = pickMatrixAxes([1, 2, 3], [10, 11, 12], genreLabels, tagLabels)

    expect(axes).toHaveLength(6)
    expect(axes.slice(0, 3).every((axis) => axis.kind === "genre")).toBe(true)
    expect(axes.slice(3).every((axis) => axis.kind === "tag")).toBe(true)
    expect(axes.map((axis) => axis.label)).toEqual([
      "Action",
      "Fantasy",
      "Comedy",
      "Isekai",
      "School",
      "Magic",
    ])
  })

  it("caps tags when genres and tags exceed six total axes", () => {
    const axes = pickMatrixAxes(
      [1, 2, 3, 4],
      [10, 11, 12],
      genreLabels,
      tagLabels
    )

    expect(axes).toHaveLength(6)
    expect(axes.filter((axis) => axis.kind === "tag")).toHaveLength(2)
  })

  it("uses empty label when catalog lookup is missing", () => {
    const axes = pickMatrixAxes([99], [], genreLabels, tagLabels)

    expect(axes[0]).toEqual({ id: 99, kind: "genre", label: "" })
  })
})

describe("computeAxisValue", () => {
  const actionAxis: TasteMatrixAxis = { id: 1, kind: "genre", label: "Action" }

  it("returns preference base when there are no previews", () => {
    expect(computeAxisValue(actionAxis, [])).toBe(70)
  })

  it("returns maximum value when every preview matches strongly", () => {
    const previews = [
      makePreview({ matchPercentage: 100, genreIds: [1] }),
      makePreview({ id: "preview-2", matchPercentage: 100, genreIds: [1] }),
    ]

    expect(computeAxisValue(actionAxis, previews)).toBe(100)
  })

  it("returns preference base when no preview matches the axis", () => {
    const previews = [
      makePreview({ genreIds: [2] }),
      makePreview({ id: "preview-2", genreIds: [3] }),
    ]

    expect(computeAxisValue(actionAxis, previews)).toBe(70)
  })

  it("blends hit rate and weighted hit rate for partial matches", () => {
    const previews = [
      makePreview({ matchPercentage: 90, genreIds: [1] }),
      makePreview({ id: "preview-2", matchPercentage: 50, genreIds: [2] }),
    ]

    // hitRate = 0.5, weightedHitRate = 90/140, blended ≈ 0.586 → round(70 + 0.586 * 30) → 88
    expect(computeAxisValue(actionAxis, previews)).toBe(88)
  })

  it("checks tag ids for tag axes", () => {
    const tagAxis: TasteMatrixAxis = { id: 10, kind: "tag", label: "Isekai" }
    const previews = [
      makePreview({ tagIds: [10], matchPercentage: 60 }),
      makePreview({ id: "preview-2", tagIds: [11], matchPercentage: 40 }),
    ]

    // hitRate = 0.5, weightedHitRate = 60/100, blended = 0.56 → round(70 + 0.56 * 30) → 87
    expect(computeAxisValue(tagAxis, previews)).toBe(87)
  })
})

describe("buildTasteChartData", () => {
  it("maps each axis to a chart point with label and computed value", () => {
    const axes: TasteMatrixAxis[] = [
      { id: 1, kind: "genre", label: "Action" },
      { id: 10, kind: "tag", label: "Isekai" },
    ]
    const previews = [
      makePreview({ genreIds: [1], tagIds: [10], matchPercentage: 100 }),
    ]

    expect(buildTasteChartData(axes, previews)).toEqual([
      { label: "Action", value: 100 },
      { label: "Isekai", value: 100 },
    ])
  })
})
