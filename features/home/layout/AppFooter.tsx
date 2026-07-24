const now = new Date()

export default function AppFooter() {
  return (
    <footer className="mt-auto h-67.5 border-t border-border px-4 sm:px-8 pt-10">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2 text-xs">
          <span>Copyright © {now.getFullYear()} Mirai Inc.</span>
          <span className="hidden sm:block">&bull;</span>
          <span>Trademark Policy</span>
        </div>
      </div>
    </footer>
  )
}
