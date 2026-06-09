import {
  isValidMMDDYYYY,
  MM_DD_YYYY_PATTERN,
  parseMMDDYYYY,
} from "@/components/date-input"
import { z } from "zod"

export const step1Schema = z.object({
  displayName: z
    .string()
    .min(3, { error: "Name must be at least 3 characters" })
    .max(100, { error: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      error: "Name must contain only letters and numbers",
    }),
})

const maxBirthDate = new Date(new Date().getFullYear() - 10, 0, 1)
const minBirthDate = new Date(1900, 0, 1)

export const birthDateStringSchema = z
  .string({ error: "Enter your birth date" })
  .min(1, { error: "Enter your birth date" })
  .regex(MM_DD_YYYY_PATTERN, { error: "Use MM/DD/YYYY format" })
  .refine(isValidMMDDYYYY, { error: "Invalid date" })
  .transform((value) => parseMMDDYYYY(value)!)

export const step2Schema = z.object({
  birthDate: birthDateStringSchema.pipe(
    z
      .date()
      .min(minBirthDate, { error: "Are you a time traveler?" })
      .max(maxBirthDate, { error: "You must be at least 10 years old" })
  ),
})

export const step3Schema = z.object({
  genrePreferences: z
    .array(z.number())
    .min(3, { error: "You must select at least 3 genres" })
    .max(6, { error: "You must select at most 6 genres" }),
  tagPreferences: z
    .array(z.number())
    .min(3, { error: "You must select at least 3 tags" })
    .max(6, { error: "You must select at most 6 tags" }),
})

export const combinedSchema = step1Schema
  .extend(step2Schema.shape)
  .extend(step3Schema.shape)

export type CombinedSchemaInput = z.input<typeof combinedSchema>
export type CombinedSchemaType = z.output<typeof combinedSchema>
