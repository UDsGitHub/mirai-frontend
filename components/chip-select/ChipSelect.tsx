"use client"

import { cn } from "@/lib/utils"
import { ChipSelectOption } from "./types"
import { UseFormRegisterReturn } from "react-hook-form"
import { useState } from "react"
import { Button } from "../ui/button"

type Props = {
  caption?: string
  options: ChipSelectOption[]
  register?: UseFormRegisterReturn<string>
  selectedValues?: string[]
  disableUnselected?: boolean
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

const chipOptionDisabledClass = cn(
  "pointer-events-none opacity-40",
  "hover:scale-100 hover:border-border hover:bg-transparent hover:text-foreground",
  "active:scale-100 active:border-border active:bg-transparent active:text-foreground",
  "before:opacity-0"
)

const DEFAULT_DISPLAY_LIMIT = 10

export default function ChipSelect({
  caption,
  options,
  register,
  selectedValues = [],
  disableUnselected = false,
  chipSelectStyles,
  renderOption,
}: Props) {
  const [displayLimit, setDisplayLimit] = useState(DEFAULT_DISPLAY_LIMIT)
  const [showMore, setShowMore] = useState(false)
  const selectedSet = new Set(selectedValues)

  const handleShowMore = () => {
    setDisplayLimit(displayLimit + DEFAULT_DISPLAY_LIMIT)
    setShowMore(true)
  }

  const handleShowLess = () => {
    setDisplayLimit(DEFAULT_DISPLAY_LIMIT)
    setShowMore(false)
  }

  return (
    <fieldset>
      {caption && (
        <legend className="text-sm font-medium text-muted-foreground">
          {caption}
        </legend>
      )}
      <div
        className={cn(
          "relative flex flex-wrap items-center gap-3",
          caption ? 'mt-4' : '',
          chipSelectStyles?.wrapperClassName
        )}
      >
        {options.slice(0, displayLimit).map((option) => {
          const isSelected = selectedSet.has(option.value)
          const isDisabled = disableUnselected && !isSelected

          if (renderOption) {
            return renderOption(option)
          }

          return (
            <label
              key={option.value}
              className={cn(
                chipOptionClass,
                chipSelectStyles?.chipClassName,
                isDisabled && chipOptionDisabledClass
              )}
            >
              <input
                type="checkbox"
                id={option.value}
                aria-label={option.label}
                className="absolute h-0 w-0 opacity-0"
                value={option.value}
                {...register}
                disabled={isDisabled}
              />
              <span className="text-sm font-semibold text-foreground">
                {option.label}
              </span>
            </label>
          )
        })}
      </div>
      {options.length > DEFAULT_DISPLAY_LIMIT && (
        <div className="flex h-12 items-center justify-center">
          {!showMore ? (
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={handleShowMore}
            >
              Show {options.length - displayLimit} more
            </Button>
          ) : (
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={handleShowLess}
            >
              Show less
            </Button>
          )}
        </div>
      )}
    </fieldset>
  )
}
