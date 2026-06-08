"use client"

import { ChipSelect } from "@/components/chip-select"
import { ChipLoader } from "@/components/loader"
import { CombinedSchemaInput } from "@/components/multistep-form"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { GetGenresDocument } from "@/gql/graphql"
import { useQuery } from "@apollo/client/react"
import { SquareLibrary } from "lucide-react"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"

type Props = {}

export default function GenreSelect({}: Props) {
  const { data, loading, error } = useQuery(GetGenresDocument)
  const {
    register,
    formState: { errors },
  } = useFormContext<CombinedSchemaInput>()

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

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
      <ChipSelect
        name="genrePreferences"
        caption={
          "Pick the genres you love most. Mirai will weight these heavily in your recommendations."
        }
        options={data.genre.map((genre) => ({
          value: genre.id.toString(),
          label: genre.name,
        }))}
        register={register("genrePreferences")}
      />
      {errors.genrePreferences && (
        <p className="text-sm text-red-500 dark:text-red-300">
          {errors.genrePreferences.message}
        </p>
      )}
    </div>
  )
}
