"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import DiscoverPageFilter from "./filter/DiscoverPageFilter"
import { AnimeFilterSchema } from "./filter/validators"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AnimeCountryOptions,
  AnimeFormatOptions,
  AnimeSeasonOptions,
  AnimeSortOptions,
  AnimeStatusOptions,
} from "@/constants/enums"
import { AnimeFilterSchemaType } from "./filter/fields/type"

export default function DiscoverPage() {
  const methods = useForm<AnimeFilterSchemaType>({
    resolver: zodResolver(AnimeFilterSchema),
    defaultValues: {
      search: "",
      genres: [],
      tags: [],
      year: "*",
      status: AnimeStatusOptions.ANY,
      format: AnimeFormatOptions.ANY,
      scoreMin: 0,
      scoreMax: 100,
      season: AnimeSeasonOptions.ANY,
      sortBy: AnimeSortOptions.UPDATED_AT_DESC,
      country: AnimeCountryOptions.ANY,
    },
  })

  return (
    <div className="mx-auto min-h-svh w-full max-w-[1920px] p-4 sm:p-8 3xl:px-12">
      <FormProvider {...methods}>
        <DiscoverPageFilter onSubmit={() => {}} />
      </FormProvider>
      <div className="grid auto-rows-max grid-cols-[repeat(auto-fit,minmax(168px,1fr))] gap-4 py-4">
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index}>
            <div className="h-70 w-full rounded-md bg-secondary 3xl:h-105" />
            <Button variant={"ghost"}>Alakazam the Great</Button>
            <div className="flex items-center gap-2">
              <Badge
                variant={"secondary"}
                className="font-bold text-muted-foreground"
              >
                MOVIE
              </Badge>
              <Badge
                variant={"secondary"}
                className="font-bold text-muted-foreground"
              >
                1960
              </Badge>
              <Badge
                variant={"secondary"}
                className="font-bold text-muted-foreground"
              >
                <Star />
                <span>55</span>
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
