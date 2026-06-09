"use client"

import { ChipSelect } from "@/components/chip-select"
import { ChipLoader } from "@/components/loader"
import {
  CombinedSchemaInput,
  useMultiStepForm,
} from "@/components/multistep-form"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { GetTagsDocument, GetTagsQuery } from "@/gql/graphql"
import { useQuery } from "@apollo/client/react"
import { SquareLibrary } from "lucide-react"
import { useFormContext } from "react-hook-form"

const arrangeTagsByCategory = (tags: GetTagsQuery["tag"]) => {
  return tags.reduce(
    (acc, tag) => {
      if (tag.category in acc) {
        acc[tag.category].push(tag)
        return acc
      } else {
        acc[tag.category] = [tag]
        return acc
      }
    },
    {} as Record<string, GetTagsQuery["tag"]>
  )
}

export default function TagSelect() {
  const { data, loading } = useQuery(GetTagsDocument)
  const { hasAttemptedStep } = useMultiStepForm()
  const {
    register,
    formState: { errors },
  } = useFormContext<CombinedSchemaInput>()

  if (loading || !data) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-4 w-32 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full rounded-full" />
        <div className="mt-4">
          <ChipLoader />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SquareLibrary className="size-6 text-cyan-300" />
          <span className="text-xl font-semibold">Core Genres</span>
        </div>
        <Badge variant={"outline"}>3 of 6 selected</Badge>
      </div>
      {Object.entries(arrangeTagsByCategory(data.tag)).map(
        ([category, tags]) => {
          return (
            <div key={category}>
              <h4>{category}</h4>
              <ChipSelect
                options={tags.map((tag) => ({
                  value: tag.id.toString(),
                  label: tag.name,
                }))}
                register={register("genrePreferences")}
              />
            </div>
          )
        }
      )}
      {hasAttemptedStep && errors.genrePreferences && (
        <p className="text-sm text-red-500 dark:text-red-300">
          {errors.genrePreferences.message}
        </p>
      )}
    </div>
  )
}
