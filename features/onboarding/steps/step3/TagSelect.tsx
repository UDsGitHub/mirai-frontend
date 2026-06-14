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
import { getFragmentData } from "@/gql"
import {
  GetTagsDocument,
  GetTagsQuery,
  TagInfoFragment,
  TagInfoFragmentDoc,
} from "@/gql/graphql"
import { useQuery } from "@apollo/client/react"
import { Tags } from "lucide-react"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"

const arrangeTagsByCategory = (tags: GetTagsQuery["tag"]) => {
  return tags
    .map((tag) => getFragmentData(TagInfoFragmentDoc, tag))
    .reduce(
      (acc, tag) => {
        if (tag.category in acc) {
          acc[tag.category].push(tag)
          return acc
        } else {
          acc[tag.category] = [tag]
          return acc
        }
      },
      {} as Record<string, TagInfoFragment[]>
    )
}

const filterTags = (tags: TagInfoFragment[], searchTerm?: string) => {
  if (!searchTerm) {
    return tags
  }

  return tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm?.toLowerCase() ?? "") ||
      tag.category.toLowerCase().includes(searchTerm?.toLowerCase() ?? "")
  )
}

type Props = {
  searchTerm?: string
}

export default function TagSelect({ searchTerm }: Props) {
  const { data, loading } = useQuery(GetTagsDocument)
  const { hasAttemptedStep } = useMultiStepForm()
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<CombinedSchemaInput>()

  const selectedTags = watch("tagPreferences", [])
  const selectedValues = selectedTags.map(String)

  const tagsList = useMemo(() => {
    if (!data || loading) {
      return null
    }

    const atMax = selectedValues.length >= MAX_SELECTABLE_TAGS
    const filteredResult = Object.entries(
      arrangeTagsByCategory(data.tag)
    ).filter((entry) => filterTags(entry[1], searchTerm).length > 0)

    if (filteredResult.every((entry) => entry[1].length === 0)) {
      return (
        <p className="text-center text-sm text-muted-foreground">
          No tags found
        </p>
      )
    }

    return filteredResult.map(([category, tags]) => {
      return (
        <div key={category} className="py-3">
          <h4 className="pb-3 text-sm text-muted-foreground uppercase">
            {category}
          </h4>
          <ChipSelect
            options={filterTags(tags, searchTerm).map((tag) => ({
              value: tag.id.toString(),
              label: tag.name,
            }))}
            register={register("tagPreferences")}
            selectedValues={selectedValues}
            disableUnselected={atMax}
          />
        </div>
      )
    })
  }, [data, loading, searchTerm, selectedValues, register])

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
      {tagsList}
      {hasAttemptedStep && errors.tagPreferences && (
        <p className="text-sm text-red-500 dark:text-red-300">
          {errors.tagPreferences.message}
        </p>
      )}
    </div>
  )
}
