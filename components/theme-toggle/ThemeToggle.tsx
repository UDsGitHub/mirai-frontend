"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  console.log("theme: ", theme)

  return (
    <fieldset className="flex items-center rounded-4xl bg-secondary p-2">
      <label className="group relative size-7 cursor-pointer rounded-full border-border has-checked:border-2 has-checked:bg-white">
        <input
          className="appearance-none"
          type="radio"
          name="theme-select"
          value={"system"}
          checked={theme === "system"}
          onChange={(e) => setTheme(e.target.value)}
        />
        <Monitor
          size={12}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-has-checked:text-black"
        />
      </label>
      <label className="group relative size-7 cursor-pointer rounded-full border-border has-checked:border-2 has-checked:bg-white">
        <input
          className="appearance-none"
          type="radio"
          name="theme-select"
          value={"light"}
          checked={theme === "light"}
          onChange={(e) => setTheme(e.target.value)}
        />
        <Sun
          size={12}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-has-checked:text-black"
        />
      </label>
      <label className="group relative size-7 cursor-pointer rounded-full border-border has-checked:border-2 has-checked:bg-white">
        <input
          className="appearance-none"
          type="radio"
          name="theme-select"
          value={"dark"}
          checked={theme === "dark"}
          onChange={(e) => setTheme(e.target.value)}
        />
        <Moon
          size={12}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-has-checked:text-black"
        />
      </label>
    </fieldset>
  )
}
