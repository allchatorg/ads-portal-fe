'use client';
import {Card} from "@/components/ui/card";
import {ShoppingBag, UserCircle} from "lucide-react";
import {useParams, usePathname} from "next/navigation";
import React, {ReactNode, useMemo} from "react";
import {NavigationTabs} from "@/components/NavigationTabs";
import {TabConfig} from "@/models/TabConfig";
import {MOCK_USERS} from "@/data/mock-users";
import {SiteHeader} from "@/components/site-header";

export default function UserLayout({children}: { children: ReactNode }) {
    const params = useParams();
    const pathname = usePathname();
    const basePath = `/admin/users/${params.id}`;

    // Find the user from mock data
    const user = useMemo(() => {
        return MOCK_USERS.find(u => u.id === params.id);
    }, [params.id]);

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

    if (!user) {
        return <div className="p-6">Loading user data...</div>;
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
