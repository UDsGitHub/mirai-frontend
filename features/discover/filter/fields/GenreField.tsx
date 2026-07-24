import { MultiSelect } from "@/components/multi-select"
import { Field, FieldLabel } from "@/components/ui/field"
import { FilterFieldType } from "./type"

export default function GenreField({control, register}: FilterFieldType) {
  console.log(control, register)
  
  return (
    <Field>
      <FieldLabel>Genre</FieldLabel>
      <MultiSelect
        options={[]}
        value={[]}
        onChange={(val: string[]) => console.log(val)}
        placeholder="Select Genres"
        emptyState="No Genres Found."
      />
    </Field>
  )
}
