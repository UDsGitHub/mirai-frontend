import { Field, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"
import { FilterFieldType } from "./type"

export default function AverageScoreField({control, register}: FilterFieldType) {
  console.log(control, register)
  
  return (
    <Field>
      <FieldLabel>Average Score</FieldLabel>
      <div className="relative flex flex-col gap-2">
        <div className="flex items-center justify-between font-semibold">
          <span>0</span>
          <span>10</span>
        </div>
        <Slider defaultValue={[0, 10]} min={0} max={10} />
      </div>
    </Field>
  )
}
