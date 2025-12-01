"use client"

import {usePathname} from "next/navigation"
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar"

export function ConditionalLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isHomePage = pathname === "/"
    const isAuthPage = pathname === "/auth" || pathname.startsWith("/auth?") || pathname === "/login" || pathname === "/signup"

    if (isHomePage || isAuthPage) {
        return <>{children}</>
    }


    return (
        <SidebarProvider
            style={
                {
                    "background-color": "#E0EEFF",
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset"/>
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    )
}
