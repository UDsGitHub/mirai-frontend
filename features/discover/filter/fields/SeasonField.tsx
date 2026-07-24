import { SelectInput } from "@/components/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { AnimeSeasonOptionStrings } from "@/constants/enums"
import { FilterFieldType } from "./type"

const seasonOptions = Object.entries(AnimeSeasonOptionStrings).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export default function SeasonField({control, register}: FilterFieldType) {
  console.log(control, register)
  
  return (
    <Field>
      <FieldLabel>Season</FieldLabel>
      <SelectInput
        options={seasonOptions}
        value={seasonOptions[0].value}
        onChange={(val) => console.log(val)}
        placeholder={"Select Season"}
      />
    </Field>
  )
}
