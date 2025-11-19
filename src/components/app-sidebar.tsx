"use client"

import * as React from "react"
import { IconChartBar, IconDashboard, IconListDetails, IconSettings, IconUser, } from "@tabler/icons-react"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, } from "@/components/ui/sidebar"

const data = {
    user: {
        name: "allchat",
        email: "allchat@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
        },
        {
            title: "Ads Overview",
            url: "#",
            icon: IconListDetails,
        },
        {
            title: "Start a Campaign",
            url: "/campaign",
            icon: IconChartBar,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
        },
        {
            title: "My Account",
            url: "#",
            icon: IconUser,
        }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className={'rounded-xl'} collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <div className="cursor-pointer flex flex-col items-center justify-center p-2 border-b">
                    <img
                        src="/allchat-logo.png"
                        alt="AllChat Logo"
                        className="w-32 h-auto mb-4"
                    />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
