import { SelectInput, SelectOptionType } from "@/components/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { AnimeStatusOptionStrings } from "@/constants/enums"
import { FilterFieldType } from "./type"

const statusOptions: SelectOptionType[] = Object.entries(
  AnimeStatusOptionStrings
).map(([value, label]) => ({
  value,
  label,
}))

export default function StatusField({control, register}: FilterFieldType) {
  console.log(control, register)
  
  return (
    <Field>
      <FieldLabel>Status</FieldLabel>
      <SelectInput
        options={statusOptions}
        value={statusOptions[0].value}
        onChange={(val) => console.log(val)}
        placeholder={"Select Status"}
      />
    </Field>
  )
}
