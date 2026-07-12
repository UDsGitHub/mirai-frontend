"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SidebarItem } from "./types"
import {
  Bookmark,
  Bot,
  Compass,
  HomeIcon,
  MessageCircleHeart,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import Link from "next/link"

type Props = {}

const navItems: SidebarItem[] = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/discover",
    label: "Discover",
    icon: Compass,
  },
  {
    href: "/ask-mirai",
    label: "Ask Mirai",
    icon: Bot,
  },
  {
    href: "/watchlist",
    label: "Watchlist",
    icon: Bookmark,
  },
  {
    href: "/social",
    label: "Social",
    icon: MessageCircleHeart,
  },
]

export default function AppSidebar({}: Props) {
  const { toggleSidebar, open } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu className="p-4">
          <SidebarMenuItem>
            <a href="/">MIRAI</a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link href={item.href} className="px-4 py-6">
                  <item.icon className="size-5!" />
                  <span className="text-base font-semibold">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="p-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={toggleSidebar}>
              <div className="flex items-center justify-end">
                {open ? <ChevronsLeft /> : <ChevronsRight />}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
