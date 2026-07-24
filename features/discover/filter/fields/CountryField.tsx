import { SelectInput, SelectOptionType } from "@/components/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { AnimeCountryOptionStrings } from "@/constants/enums"
import { FilterFieldType } from "./type"

const countryOptions: SelectOptionType[] = Object.entries(
  AnimeCountryOptionStrings
).map(([value, label]) => ({
  value,
  label,
}))

export default function CountryField({control, register}: FilterFieldType) {
  console.log(control, register)
  
  return (
    <Field>
      <FieldLabel>Country of Origin</FieldLabel>
      <SelectInput
        options={countryOptions}
        value={countryOptions[0].value}
        onChange={(val) => console.log(val)}
        placeholder="Select Country"
      />
    </Field>
  )
}
