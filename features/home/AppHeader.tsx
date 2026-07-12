"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <SidebarTrigger />
    </header>
  )
}
