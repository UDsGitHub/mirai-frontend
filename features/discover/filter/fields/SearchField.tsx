import { Field } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon, Slash } from "lucide-react"
import { useEffect, useRef } from "react"
import { FilterFieldType } from "./type"

export default function SearchField({control, register}: FilterFieldType) {
  console.log(control, register)
  
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = inputRef.current
    if (!input || document === undefined) return

    const focusInput = (e: KeyboardEvent) => {
      if (e.key === "/") {
        if (document.activeElement === input) {
          return
        }

        e.preventDefault()
        input.focus()
      }
    }

    document.addEventListener("keydown", focusInput)

    return () => {
      document.removeEventListener("keydown", focusInput)
    }
  }, [])

  return (
    <Field>
      <InputGroup>
        <InputGroupInput
          ref={inputRef}
          id="anime-search-input"
          placeholder="Search Anime"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault()
              e.currentTarget.blur()
            }
          }}
        />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Slash className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
