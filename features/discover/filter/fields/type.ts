import { Control, UseFormRegister } from "react-hook-form"
import z from "zod"
import { AnimeFilterSchema } from "../validators"

export type AnimeFilterSchemaType = z.infer<typeof AnimeFilterSchema>

export type FilterFieldType = {
    control: Control<AnimeFilterSchemaType>
    register: UseFormRegister<AnimeFilterSchemaType>
}