import { DateInput } from "@/components/date-input"
import {
  CombinedSchemaInput,
  useMultiStepForm,
} from "@/components/multistep-form"
import { motion } from "motion/react"
import { Controller, useFormContext } from "react-hook-form"
import StepBackground from "../../layout/StepBackground"

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
      className="h-full"
    >
      <StepBackground
        imageSrc="/assets/images/yoko_bg.png"
        className="flex items-center justify-center p-4 sm:p-0"
      >
        <div className="flex flex-col gap-2">
          <h1 className="sm:mb-4 text-center text-2xl sm:text-6xl font-bold font-zalando">
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
                className="px-4 py-6 text-center text-xl sm:text-2xl! font-semibold placeholder:text-base placeholder:font-light"
                variant="underline"
                aria-invalid={fieldState.invalid}
                autoFocus
              />
            )}
          />
          {hasAttemptedStep && errors.birthDate && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.birthDate.message}
            </p>
          )}
        </div>
      </StepBackground>
    </motion.div>
  )
}
