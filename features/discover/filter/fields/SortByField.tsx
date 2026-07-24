import { SelectInput, SelectOptionType } from "@/components/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { AnimeSortOptionStrings } from "@/constants/enums"
import { FilterFieldType } from "./type"

const sortByOptions: SelectOptionType[] = Object.entries(
  AnimeSortOptionStrings
).map(([value, label]) => ({
  value,
  label,
}))

export default function SortByField({control, register}: FilterFieldType) {
  console.log(control, register)
  
  return (
    <Field>
      <FieldLabel>Sort By</FieldLabel>
      <SelectInput
        options={sortByOptions}
        value={sortByOptions[0].value}
        onChange={(val) => console.log(val)}
        placeholder={"Sort By"}
      />
    </Field>
  )
}
