import { DateInput } from "@/components/date-input"
import {
  CombinedSchemaInput,
  useMultiStepForm,
} from "@/components/multistep-form"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Controller, useFormContext } from "react-hook-form"

export default function Step2() {
  const { hasAttemptedStep } = useMultiStepForm()
  const {
    control,
    formState: { errors },
  } = useFormContext<CombinedSchemaInput>()

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "relative flex h-full items-center justify-center",
        "bg-background bg-[url('/assets/images/yoko_bg.png')] bg-contain bg-center bg-no-repeat bg-blend-multiply",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-background before:bg-[url('/assets/images/yoko_bg.png')] before:bg-contain before:bg-center before:bg-no-repeat before:opacity-5 before:mix-blend-luminosity before:content-['']"
      )}
    >
      <div className="flex flex-col gap-2">
        <h1 className="mb-4 text-center text-6xl font-bold">
          When were you born?
        </h1>
        <Controller
          name="birthDate"
          control={control}
          render={({ field, fieldState }) => (
            <DateInput
              name={field.name}
              id={field.name}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Month/Day/Year"
              className="px-4 py-6 text-center text-2xl! font-semibold"
              variant="underline"
              aria-invalid={fieldState.invalid}
              autoFocus
            />
          )}
        />
        {hasAttemptedStep && errors.birthDate && (
          <p className="text-sm text-red-500 dark:text-red-300">
            {errors.birthDate.message}
          </p>
        )}
      </div>
    </motion.div>
  )
}
