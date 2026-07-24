import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Trash } from "lucide-react"
import DiscoverPageFilterHeader from "./DiscoverPageFilterHeader"
import GenreField from "./fields/GenreField"
import TagField from "./fields/TagField"
import YearField from "./fields/YearField"
import StatusField from "./fields/StatusField"
import FormatField from "./fields/FormatField"
import AverageScoreField from "./fields/AverageScoreField"
import SeasonField from "./fields/SeasonField"
import SortByField from "./fields/SortByField"
import CountryField from "./fields/CountryField"
import { useFormContext } from "react-hook-form"
import { AnimeFilterSchemaType } from "./fields/type"

type Props = {
  onSubmit: (values: AnimeFilterSchemaType) => void
}

export default function DiscoverPageFilter({ onSubmit }: Props) {
  const { control, register, handleSubmit } =
    useFormContext<AnimeFilterSchemaType>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Collapsible>
            <DiscoverPageFilterHeader control={control} register={register} />
            <CollapsibleContent className="animated-collapsible pt-4">
              <div className="grid auto-rows-max grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] items-end gap-4">
                <GenreField control={control} register={register} />
                <TagField control={control} register={register} />
                <YearField control={control} register={register} />
                <StatusField control={control} register={register} />
                <FormatField control={control} register={register} />
                <AverageScoreField control={control} register={register} />
                <SeasonField control={control} register={register} />
                <SortByField control={control} register={register} />
                <CountryField control={control} register={register} />
                <div className="flex">
                  <Button variant={"primary"} type="submit">
                    Apply
                  </Button>
                  <Button variant={"ghost"}>
                    <Trash />
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </form>
  )
}
