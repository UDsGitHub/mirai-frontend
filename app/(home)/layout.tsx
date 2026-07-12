import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/features/home/sidebar/AppSidebar"
import React from "react"

type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
