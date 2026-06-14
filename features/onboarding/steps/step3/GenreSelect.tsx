"use client"

import { ChipSelect } from "@/components/chip-select"
import { ChipLoader } from "@/components/loader"
import {
  CombinedSchemaInput,
  MAX_SELECTABLE_GENRES,
  useMultiStepForm,
} from "@/components/multistep-form"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getFragmentData } from "@/gql"
import {
  GenreInfoFragment,
  GenreInfoFragmentDoc,
  GetGenresDocument,
} from "@/gql/graphql"
import { useQuery } from "@apollo/client/react"
import { SquareLibrary } from "lucide-react"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"

type Props = {
  searchTerm?: string
}

export default function GenreSelect({ searchTerm }: Props) {
  const { data, loading } = useQuery(GetGenresDocument)
  const { hasAttemptedStep } = useMultiStepForm()
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<CombinedSchemaInput>()

  const selectedGenres = watch("genrePreferences", [])
  const selectedValues = selectedGenres.map(String)

  const filteredGenres = useMemo(() => {
    if (!data || loading) {
      return null
    }

    const atMax = selectedValues.length >= MAX_SELECTABLE_GENRES

    let filteredResult: GenreInfoFragment[] = data.genre.map((genre) =>
      getFragmentData(GenreInfoFragmentDoc, genre)
    )

    if (searchTerm) {
      filteredResult = filteredResult.filter((genre) =>
        genre.name.toLowerCase().includes(searchTerm?.toLowerCase() ?? "")
      )
    }

    if (searchTerm && filteredResult.length === 0) {
      return (
        <p className="text-center text-sm text-muted-foreground">
          No genres found
        </p>
      )
    }

    return (
      <ChipSelect
        caption={
          "Pick the genres you love most. Mirai will weight these heavily in your recommendations."
        }
        options={filteredResult.map((genre) => ({
          value: genre.id.toString(),
          label: genre.name,
        }))}
        register={register("genrePreferences")}
        selectedValues={selectedValues}
        disableUnselected={atMax}
      />
    )
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
          <SquareLibrary className="size-6 text-cyan-300" />
          <span className="text-xl font-semibold">Core Genres</span>
        </div>
        <Badge variant={"outline"}>
          {selectedValues.length} of {MAX_SELECTABLE_GENRES} selected
        </Badge>
      </div>
      <div className="pt-3">{filteredGenres}</div>
      {hasAttemptedStep && errors.genrePreferences && (
        <p className="text-sm text-red-500 dark:text-red-300">
          {errors.genrePreferences.message}
        </p>
      )}
    </div>
  )
}
