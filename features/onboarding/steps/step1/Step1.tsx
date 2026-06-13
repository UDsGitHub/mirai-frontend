"use client"

import {
  CombinedSchemaInput,
  useMultiStepForm,
} from "@/components/multistep-form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
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
      className={cn(
        "relative flex h-full items-center justify-center",
        "bg-background bg-[url('/assets/images/kamina_bg.webp')] bg-contain bg-center bg-no-repeat bg-blend-multiply",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-background before:bg-[url('/assets/images/kamina_bg.webp')] before:bg-contain before:bg-center before:bg-no-repeat before:opacity-5 before:mix-blend-luminosity before:content-['']"
      )}
    >
      <div className="flex flex-col gap-2">
        <h1 className="mb-4 cursor-default text-center text-6xl font-bold">
          What should we call you?
        </h1>
        <Input
          {...register("displayName")}
          placeholder="Enter your display name"
          className="px-4 py-6 text-center text-2xl! font-semibold"
          variant={"underline"}
          autoFocus
        />
        {hasAttemptedStep && errors.displayName && (
          <p className="text-sm text-red-500 dark:text-red-300">
            {errors.displayName.message}
          </p>
        )}
      </div>
    </motion.div>
  )
}
