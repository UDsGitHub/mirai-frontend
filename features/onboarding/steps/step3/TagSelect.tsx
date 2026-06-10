"use client"

import { ChipSelect } from "@/components/chip-select"
import { ChipLoader } from "@/components/loader"
import {
  CombinedSchemaInput,
  MAX_SELECTABLE_TAGS,
  useMultiStepForm,
} from "@/components/multistep-form"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { GetTagsDocument, GetTagsQuery } from "@/gql/graphql"
import { useQuery } from "@apollo/client/react"
import { Tags } from "lucide-react"
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
    watch,
  } = useFormContext<CombinedSchemaInput>()

  const selectedTags = watch("tagPreferences", [])
  const selectedValues = selectedTags.map(String)
  const atMax = selectedValues.length >= MAX_SELECTABLE_TAGS

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
          <Tags className="size-6 text-cyan-300" />
          <span className="text-xl font-semibold">Preferred Tags & Tropes</span>
        </div>
        <Badge variant={"outline"}>
          {selectedValues.length} of {MAX_SELECTABLE_TAGS} selected
        </Badge>
      </div>
      <p className="pt-3 text-sm font-medium text-muted-foreground">
        Fine-tune your taste profile with specific narrative and aesthetic
        themes you enjoy.
      </p>
      {Object.entries(arrangeTagsByCategory(data.tag)).map(
        ([category, tags]) => {
          return (
            <div key={category} className="py-3">
              <h4 className="pb-3 text-sm text-muted-foreground uppercase">
                {category}
              </h4>
              <ChipSelect
                options={tags.map((tag) => ({
                  value: tag.id.toString(),
                  label: tag.name,
                }))}
                register={register("tagPreferences")}
                selectedValues={selectedValues}
                disableUnselected={atMax}
              />
            </div>
          )
        }
      )}
      {hasAttemptedStep && errors.tagPreferences && (
        <p className="text-sm text-red-500 dark:text-red-300">
          {errors.tagPreferences.message}
        </p>
      )}
    </div>
  )
}
