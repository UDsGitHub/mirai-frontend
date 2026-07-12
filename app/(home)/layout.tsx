import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {AppHeader, AppSidebar} from "@/features/home"
import React from "react"

type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
