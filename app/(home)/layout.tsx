import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {AppHeader, AppSidebar} from "@/features/home"
import React from "react"

type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <SidebarProvider
      style={
        { "--sidebar-width-icon": "4rem" } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
