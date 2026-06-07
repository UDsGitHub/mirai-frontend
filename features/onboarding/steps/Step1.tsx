"use client"

import { CombinedSchemaType } from "@/components/multistep-form"
import { Input } from "@/components/ui/input"
import { motion } from "motion/react"
import { useFormContext } from "react-hook-form"

type Props = {}

export default function Step1({}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CombinedSchemaType>()

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex h-full items-center justify-center"
    >
      <div className="flex flex-col gap-2">
        <h1 className="mb-4 text-center text-6xl font-bold">
          What should we call you?
        </h1>
        <Input
          {...register("displayName")}
          placeholder="Enter your display name"
          className="px-4 py-6 text-center text-2xl! font-semibold"
          variant={"underline"}
        />
        {errors.displayName && (
          <p className="text-sm text-red-500 dark:text-red-300">{errors.displayName.message}</p>
        )}
      </div>
    </motion.div>
  )
}
