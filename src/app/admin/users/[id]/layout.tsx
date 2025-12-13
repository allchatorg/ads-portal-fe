"use client";
import {Card} from "@/components/ui/card";
import {ShoppingBag, UserCircle} from "lucide-react";
import {useParams, usePathname} from "next/navigation";
import React, {ReactNode} from "react";
import {NavigationTabs} from "@/components/NavigationTabs";
import {TabConfig} from "@/models/TabConfig";
import {SiteHeader} from "@/components/site-header";
import {useGetUserByIdQuery} from "@/store/services/adminUsersApi";

export default function UserLayout({children}: { children: ReactNode }) {
    const params = useParams();
    const pathname = usePathname();
    const userId = Number(params.id);
    const basePath = `/admin/users/${params.id}`;

    const {data: user, isLoading} = useGetUserByIdQuery(userId, {
        skip: isNaN(userId),
    });

    const tabs: TabConfig[] = [
        {
            value: "details",
            label: "Details",
            href: `${basePath}/details`,
            icon: UserCircle
        },
        {
            value: "ads",
            label: "Ads",
            href: `${basePath}/ads`,
            icon: ShoppingBag
        },
    ];

    const currentTab = tabs.find(tab => pathname === tab.href) || tabs[0];
    const activeTabValue = pathname.split('/').pop() || 'details';

    if (isLoading) {
        return <div className="p-6">Loading user data...</div>;
    }

    if (!user) {
        return <div className="p-6">User not found</div>;
    }

    return (
        <div className="flex h-full w-full flex-col">
            <SiteHeader
                title={`User ${currentTab.label}`}
                description={`Viewing ${currentTab.label.toLowerCase()} for ${user.email}`}
            />
            <div className="flex h-full w-full flex-col p-4 space-y-4">
                <Card className="flex min-h-0 flex-1 flex-col p-0 overflow-hidden">
                    <NavigationTabs tabs={tabs} activeValue={activeTabValue}>
                        <div className="h-full w-full p-4">
                            {children}
                        </div>
                    </NavigationTabs>
                </Card>
            </div>
        </div>
    );
}
