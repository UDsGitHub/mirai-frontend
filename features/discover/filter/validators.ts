import {
  AnimeCountryOptions,
  AnimeFormatOptions,
  AnimeSeasonOptions,
  AnimeSortOptions,
  AnimeStatusOptions,
} from "@/constants/enums"
import z from "zod"

export const AnimeFilterSchema = z
  .object({
    search: z.string(),
    genres: z.array(z.number()),
    tags: z.array(z.number()),
    year: z.string(),
    status: z.enum(AnimeStatusOptions),
    format: z.enum(AnimeFormatOptions),
    scoreMin: z.number(),
    scoreMax: z.number(),
    season: z.enum(AnimeSeasonOptions),
    sortBy: z.enum(AnimeSortOptions),
    country: z.enum(AnimeCountryOptions),
  })
  .refine((data) => data.scoreMin <= data.scoreMax, {
    path: ["scoreMin"],
    error: 'Minimum value cannot be greater than maximum value'
  })
