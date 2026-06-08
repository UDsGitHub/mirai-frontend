"use client"

import { Input } from "../ui/input"
import { formatDateDigits, isAllowedDateDigits } from "./utils"

type Props = {
  value?: string
  onChange: (value: string) => void
  onBlur?: () => void
  name?: string
  id?: string
  placeholder?: string
  className?: string
  variant?: "underline" | "outlined"
  "aria-invalid"?: boolean
}

export default function DateInput({
  value = "",
  onChange,
  onBlur,
  name,
  id,
  placeholder,
  className,
  variant,
  "aria-invalid": ariaInvalid,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 8)

    if (!isAllowedDateDigits(digits)) {
      return
    }

    onChange(formatDateDigits(digits))
  }

  return (
    <Input
      type="text"
      inputMode="numeric"
      autoComplete="bday"
      name={name}
      id={id}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={placeholder || "MM/DD/YYYY"}
      className={className}
      variant={variant}
      aria-invalid={ariaInvalid}
    />
  )
}
