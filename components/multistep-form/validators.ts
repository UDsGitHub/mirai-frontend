import { z } from "zod";

export const step1Schema = z.object({
    displayName: z.string().min(3, { error: "Name must be at least 3 characters" }).max(100, { error: "Name must be less than 100 characters" }).regex(/^[a-zA-Z0-9]+$/, { error: "Name must contain only letters and numbers" }),
})

export const step2Schema = z.object({
    birthDate: z.date().min(new Date(1900, 0, 1), { error: "Are you a time traveler?" }).max(new Date(new Date().getFullYear() - 10, 0, 1), { error: "You must be at least 10 years old" }),
})

export const step3Schema = z.object({
    genrePreferences: z.array(z.number()).min(3).max(6, { error: "You must select at least 3 genres" }),
    tagPreferences: z.array(z.number()).min(3).max(6, { error: "You must select at least 3 tags" }),
})

export const combinedSchema = step1Schema.extend(step2Schema.shape).extend(step3Schema.shape)
export type CombinedSchemaType = z.infer<typeof combinedSchema>
