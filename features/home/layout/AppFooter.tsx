import { ThemeToggle } from "@/components/theme-toggle"

const now = new Date()

export default function AppFooter() {
  return (
    <footer className="mt-10 h-[270px] border-t border-border px-4 sm:px-8 pt-10">
      <div className="mx-auto flex flex-col sm:flex-row w-full max-w-[1920px] items-start sm:items-center gap-6 sm:gap-0 justify-between">
        <ThemeToggle />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2 text-xs">
          <span>Copyright © {now.getFullYear()} Mirai Inc.</span>
          <span className="hidden sm:block">&bull;</span>
          <span>Trademark Policy</span>
        </div>
      </div>
    </footer>
  )
}
