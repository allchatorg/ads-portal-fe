"use client"

import * as React from "react"
import { IconChartBar, IconCreditCard, IconDashboard, IconListDetails, IconUser, IconUsers } from "@tabler/icons-react"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, } from "@/components/ui/sidebar"
import { useUser } from "@/hooks/use-user"
import { UserRole } from "@/models/user-role"
import { useLogoutMutation } from "@/store/services/userApi"
import { useAppDispatch } from "@/store/hooks"
import { clearUser } from "@/store/slices/authSlice"
import { useRouter } from "next/navigation"

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
        url: "/account",
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
        url: "/account",
        icon: IconUser,
    }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useUser()
    const isAdmin = user.role === UserRole.ADMIN

    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout().unwrap()
        } catch (e) {
            // ignore error but still clear state and redirect
            console.error("Logout failed: ", e)
        } finally {
            dispatch(clearUser())
            router.push("/login")
        }
    }

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
                <NavUser user={{
                    name: user.name,
                    email: user.email,
                    avatar: "/avatars/shadcn.jpg",
                }} onLogout={handleLogout} />
            </SidebarFooter>
        </Sidebar>
    )
}
