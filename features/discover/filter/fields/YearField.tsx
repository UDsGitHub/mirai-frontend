import { SelectInput, SelectOptionType } from "@/components/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { FilterFieldType } from "./type"

const getYearOptions = () => {
  const now = new Date()
  const years: SelectOptionType[] = []

  for (let i = 1940; i <= now.getFullYear(); i++) {
    years.push({ value: i.toString(), label: i.toString() })
  }

  return years
}

export default function YearSelect({control, register}: FilterFieldType) {
  console.log(control, register)
  
  const options = [{ value: "*", label: "Any Year" }, ...getYearOptions()]
  
  return (
    <Field>
      <FieldLabel>Year</FieldLabel>
      <SelectInput
        options={options}
        value={options[0].value}
        onChange={(val) => console.log(val)}
        label={"Year"}
        placeholder={"Select Year"}
      />
    </Field>
  )
}
