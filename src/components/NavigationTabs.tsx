import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ReactNode } from "react";
import { TabConfig } from "@/models/TabConfig";

interface NavigationTabsProps {
    tabs: TabConfig[];
    activeValue: string;
    className?: string;
    tabsListClassName?: string;
    tabTriggerClassName?: string;
    children?: ReactNode;
}

export function NavigationTabs({
    tabs,
    activeValue,
    className = "flex h-full w-full ",
    tabsListClassName = "flex w-full rounded-none border-b h-12 bg-transparent p-0 flex-shrink-0",
    tabTriggerClassName = "rounded-none border-b-2 data-[state=active]:border-blue-600 overflow-hidden",
    children
}: NavigationTabsProps) {

    return (
        <Tabs value={activeValue} className={className}>
            <TabsList
                className={tabsListClassName}
            >
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={tabTriggerClassName}
                        asChild
                    >
                        <Link
                            href={tab.href}
                            className="flex h-full flex-1 items-center justify-center gap-2"
                        >
                            {tab.icon && <tab.icon className="h-4 w-4" />}
                            {tab.label}
                        </Link>
                    </TabsTrigger>
                ))}
            </TabsList>

            {children && (
                <div className="min-h-0 flex-1 overflow-hidden">
                    {children}
                </div>
            )}
        </Tabs>
    );
}
