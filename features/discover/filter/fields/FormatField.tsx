import { SelectInput } from "@/components/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { AnimeFormatOptionStrings } from "@/constants/enums"
import { FilterFieldType } from "./type"

const formatOptions = Object.entries(AnimeFormatOptionStrings).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export default function FormatField({control, register}: FilterFieldType) {
  console.log(control, register)
  
  return (
    <Field>
      <FieldLabel>Format</FieldLabel>
      <SelectInput
        options={formatOptions}
        value={formatOptions[0].value}
        onChange={(val) => console.log(val)}
        placeholder={"Select Format"}
      />
    </Field>
  )
}
