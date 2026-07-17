import { motion } from "motion/react"
import { ReactNode } from "react"

type Props = {
  header: ReactNode
  children: ReactNode
}

export default function FriendsActivityCardWrapper({ header, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.36,
        ease: "easeOut",
      }}
      className="group flex h-[232px] w-[420px] shrink-0 flex-col gap-4 rounded-md border border-border p-4 duration-500 ease-in-out focus-within:-translate-y-0.5 hover:-translate-y-1"
    >
      {header}
      {children}
    </motion.div>
  )
}
