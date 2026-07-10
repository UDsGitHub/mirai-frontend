"use client"

import {
  CombinedSchemaInput,
  useMultiStepForm,
} from "@/components/multistep-form"
import { Input } from "@/components/ui/input"
import StepBackground from "../../layout/StepBackground"
import { motion } from "motion/react"
import { useFormContext } from "react-hook-form"

export default function Step1() {
  const { hasAttemptedStep } = useMultiStepForm()
  const {
    register,
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
        imageSrc="/assets/images/kamina_bg.webp"
        className="flex items-center justify-center p-4 sm:p-0"
      >
        <div className="flex flex-col gap-2">
        <h1 className="sm:mb-4 cursor-default text-center text-2xl sm:text-6xl font-bold font-panchang">
          What should we call you?
        </h1>
        <Input
          {...register("displayName")}
          placeholder="Enter your display name"
          className="px-4 py-6 text-center text-xl sm:text-2xl! font-semibold placeholder:text-base placeholder:sm:text-xl placeholder:font-light"
          variant={"underline"}
          autoFocus
        />
        {hasAttemptedStep && errors.displayName && (
          <p className="text-sm text-center text-red-500 dark:text-red-400">
            {errors.displayName.message}
          </p>
        )}
        </div>
      </StepBackground>
    </motion.div>
  )
}
