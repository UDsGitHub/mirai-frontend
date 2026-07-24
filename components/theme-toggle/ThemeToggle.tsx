"use client"

import { cn } from "@/lib/utils"
import { type LucideIcon, Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

type ThemeValue = "system" | "light" | "dark"

type Props = {
  collapsed: boolean
}

const options: {
  value: ThemeValue
  icon: LucideIcon
}[] = [
  { value: "system", icon: Monitor },
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
]

const emptySubscribe = () => () => {}

export default function ThemeToggle({ collapsed }: Props) {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

  const activeTheme = mounted ? theme : undefined

  const isVisible = (themeValue: ThemeValue) =>
    (collapsed && activeTheme === themeValue) || !collapsed

  return (
    <fieldset className="flex w-max items-center rounded-4xl bg-secondary p-2">
      {options.map(({ value, icon: Icon }) => {
        const selected = activeTheme === value

        return (
          <label
            key={value}
            style={{ display: isVisible(value) ? "block" : "none" }}
            className={cn(
              "group/theme relative size-7 cursor-pointer rounded-full border-solid border-border",
              selected ? "border-2 bg-white" : "border-0"
            )}
          >
            <input
              className="appearance-none"
              type="radio"
              name="theme-select"
              value={value}
              checked={selected}
              onChange={(e) => setTheme(e.target.value)}
            />
            <Icon
              size={12}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                selected ? "text-black" : "text-accent-foreground"
              )}
            />
          </label>
        )
      })}
    </fieldset>
  )
}
