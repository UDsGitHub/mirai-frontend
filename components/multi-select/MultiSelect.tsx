import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox"
import { ReactNode } from "react"

type Props = {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  emptyState: string | ReactNode
}

export default function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
  emptyState = "No items found.",
}: Props) {
  return (
    <Combobox items={options} multiple value={value} onValueChange={onChange}>
      <ComboboxChips>
        <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput placeholder={placeholder} />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>{emptyState}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
