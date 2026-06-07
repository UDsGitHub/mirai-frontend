import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full min-w-0 bg-transparent text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        outlined:
          "h-8 rounded-lg border border-input px-2.5 py-1 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        underline:
          "h-10 rounded-none border-0 border-b border-input px-0 pb-2 pt-1 shadow-none focus-visible:border-b-2 focus-visible:border-primary focus-visible:ring-0 disabled:bg-transparent aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive dark:bg-transparent dark:disabled:bg-transparent",
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  }
)

type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    label?: string
  }

function Input({
  className,
  type,
  variant,
  label,
  id: idProp,
  ...props
}: InputProps) {
  const generatedId = React.useId()
  const id = idProp ?? (label ? generatedId : undefined)

  const input = (
    <input
      type={type}
      id={id}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )

  if (!label) {
    return input
  }

  return (
    <div
      data-slot="input-group"
      className={cn(
        "group/input flex w-full flex-col gap-1.5",
        variant === "underline" && "gap-1"
      )}
    >
      <label
        htmlFor={id}
        className={cn(
          "text-sm leading-none font-medium text-foreground select-none",
          variant === "underline" &&
            "text-xs font-normal text-muted-foreground transition-colors group-focus-within/input:text-primary"
        )}
      >
        {label}
      </label>
      {input}
    </div>
  )
}

export { Input, inputVariants }
