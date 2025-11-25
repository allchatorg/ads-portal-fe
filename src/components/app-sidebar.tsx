"use client"

import * as React from "react"
import { IconChartBar, IconCreditCard, IconDashboard, IconListDetails, IconSettings, IconUser, IconUsers } from "@tabler/icons-react"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, } from "@/components/ui/sidebar"
import { useUser } from "@/hooks/use-user"
import { UserRole } from "@/models/user-role"

const userData = {
    name: "allchat",
    email: "allchat@example.com",
    avatar: "/avatars/shadcn.jpg",
}

const regularUserNavMain = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
    },
    {
        title: "My Campaigns",
        url: "/ads",
        icon: IconListDetails,
    },
    {
        title: "Start a Campaign",
        url: "/campaign",
        icon: IconChartBar,
    },
]

const regularUserNavSecondary = [
    {
        title: "Payment Methods",
        url: "/payment-methods",
        icon: IconCreditCard,
    },
    {
        title: "My Account",
        url: "#",
        icon: IconUser,
    }
]

const adminNavMain = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: IconDashboard,
    },
    {
        title: "Ads",
        url: "/admin/ads",
        icon: IconListDetails,
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: IconUsers,
    },
]

const adminNavSecondary = [
    {
        title: "My Account",
        url: "#",
        icon: IconUser,
    }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useUser()
    const isAdmin = user.role === UserRole.ADMIN

    const navMain = isAdmin ? adminNavMain : regularUserNavMain
    const navSecondary = isAdmin ? adminNavSecondary : regularUserNavSecondary

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
                <NavMain items={navMain} />
                <NavSecondary items={navSecondary} className="mt-auto" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={userData} />
            </SidebarFooter>
        </Sidebar>
    )
}
