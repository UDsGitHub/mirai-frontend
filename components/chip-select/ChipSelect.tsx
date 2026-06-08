"use client"

import { cn } from "@/lib/utils"
import { ChipSelectOption } from "./types"
import { UseFormRegisterReturn } from "react-hook-form"

type Props = {
  caption?: string
  options: ChipSelectOption[]
  register?: UseFormRegisterReturn<string>
  chipSelectStyles?: {
    wrapperClassName?: string
    chipClassName?: string
  }
  renderOption?: (option: ChipSelectOption) => React.ReactNode
}

const chipOptionClass = cn(
  "relative rounded-lg border border-border px-6 py-2 duration-300",
  "hover:scale-105 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-primary-foreground",
  "active:scale-95 active:border-purple-500 active:bg-purple-500/20 active:text-primary-foreground",
  "[&:has(input:checked)]:scale-105 [&:has(input:checked)]:border-purple-500 [&:has(input:checked)]:bg-purple-500/20 [&:has(input:checked)]:text-primary-foreground",
  "before:absolute before:-inset-1 before:-z-10 before:content-['']",
  "before:rounded-lg before:bg-purple-500 before:opacity-0 before:blur-xs before:transition-all before:duration-300",
  "[&:has(input:checked)]:before:opacity-25 [&:has(input:checked)]:before:blur-sm"
)

export default function ChipSelect({
  caption,
  options,
  register,
  chipSelectStyles,
  renderOption,
}: Props) {
  return (
    <fieldset>
      {caption && (
        <legend className="text-sm font-medium text-muted-foreground">
          {caption}
        </legend>
      )}
      <div
        className={cn(
          "mt-4 flex flex-wrap items-center gap-3",
          chipSelectStyles?.wrapperClassName
        )}
      >
        {options.map((option) =>
          renderOption ? (
            renderOption(option)
          ) : (
            <label
              key={option.value}
              className={cn(chipOptionClass, chipSelectStyles?.chipClassName)}
            >
              <input
                type="checkbox"
                id={option.value}
                aria-label={option.label}
                className={"absolute h-0 w-0 opacity-0"}
                {...register}
              />
              <span className="text-sm font-semibold text-foreground">
                {option.label}
              </span>
            </label>
          )
        )}
      </div>
    </fieldset>
  )
}
