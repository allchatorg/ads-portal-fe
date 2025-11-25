import {StatCard} from "@/components/stat-card";
import {NotifyCard} from "@/components/NotifyCard";
import {CompletionCard} from "@/components/CompletionCard";
import Link from "next/link";

const statsData = [
    {
        id: 1,
        title: "Total Ad Views Today",
        value: "12,345",
        trend: "up" as const,
        trendValue: "+8%",
        footerText: "Compared to yesterday",
        description: "Total views across all ads",
    },
];

const notifyCardsData = [
    {
        id: 2,
        title: "Submitted Ads",
        value: 3,
        label: "Review",
        description: "Ads waiting for approval",
        variant: "warning",
        href: "/ads?status=submitted",
    },
    {
        id: 3, // Fixed duplicate ID
        title: "Active Ads",
        value: 10,
        label: "View",
        description: "Currently active ads",
        variant: "success",
        href: "/ads?status=active",
    },
];

const completionCardsData = [
    {
        id: 3,
        title: "Total Served Views",
        current: 7056,
        total: 10000,
        description: "Served 70.56% of all views",
    },
];


export function SectionCards() {
    return (
        <div
            className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {statsData.map((stat) => (
                <StatCard
                    key={stat.id}
                    title={stat.title}
                    value={stat.value}
                    trend={stat.trend}
                    trendValue={stat.trendValue}
                    footerText={stat.footerText}
                    description={stat.description}
                />
            ))}

            {notifyCardsData.map((card) => (
                <Link key={card.id} href={card.href} className="contents">
                    <NotifyCard
                        title={card.title}
                        value={card.value}
                        label={card.label}
                        description={card.description}
                        variant={card.variant as "default" | "success" | "warning" | "destructive"}
                    />
                </Link>
            ))}

            {completionCardsData.map((card) => (
                <CompletionCard
                    key={card.id}
                    title={card.title}
                    current={card.current}
                    total={card.total}
                    description={card.description}
                />
            ))}
        </div>
    );
}
