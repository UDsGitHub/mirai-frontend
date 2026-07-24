import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { ClassValue } from "clsx"

export type SelectOptionType = {
  value: string
  label: string
}

type Props = {
  options: SelectOptionType[]
  value?: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  className?: ClassValue
}

export default function SelectInput({
  options,
  value,
  onChange,
  label,
  placeholder,
  className,
}: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
