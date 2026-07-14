"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Bookmark,
  Bot,
  Compass,
  HomeIcon,
  MessageCircleHeart,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { TooltipProvider } from "@/components/ui/tooltip"
import { type LucideIcon } from "lucide-react"

export type SidebarItem = {
  label: string
  href: string
  icon: LucideIcon
}

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

export default function AppSidebar() {
  const { open } = useSidebar()

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="pt-4 pb-2">
          <SidebarMenu>
            <SidebarMenuItem>
              {open ? (
                <Link
                  href="/"
                  className="flex items-center justify-center font-kihim text-2xl font-medium tracking-wider text-foreground"
                >
                  MIRAI
                </Link>
              ) : (
                <Link href="/" className="flex items-center justify-center text-foreground">
                  <Eye className="size-5!" />
                </Link>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="group-data-[state=expanded]:px-4">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem
                key={item.href}
                className="group-data-[collapsible=icon]:py-2!"
              >
                <SidebarMenuButton
                  asChild
                  className="group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:pl-2!"
                  tooltip={item.label}
                >
                  <Link href={item.href} className="px-4 py-6">
                    <item.icon className="size-5!" />
                    <span className="font-medium">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  )
}
