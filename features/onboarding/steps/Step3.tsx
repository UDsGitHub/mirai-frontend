import { motion } from "motion/react"

export default function Step3() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex h-full items-center justify-center"
    >Step3</motion.div>
  )
}
