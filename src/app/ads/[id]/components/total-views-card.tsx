import {Card} from "@/components/ui/card";
import * as React from "react";
import clsx from "clsx";

interface TotalViewsCardProps {
    title?: string;
    currentValue: number;
    previousValue?: number;
    comparisonText?: string;
    className?: string;
}

export function TotalViewsCard({
                                   title = "Total Views",
                                   currentValue,
                                   previousValue,
                                   comparisonText = "from yesterday",
                                   className,
                               }: TotalViewsCardProps) {
    const change =
        previousValue !== undefined && previousValue !== 0
            ? `${(((currentValue - previousValue) / previousValue) * 100).toFixed(1)}%`
            : null;

    return (
        <Card
            className={clsx(
                "flex flex-col justify-between items-center p-4 border-none shadow-none bg-muted/80",
                className
            )}
        >
            <div className="text-sm font-medium text-muted-foreground">{title}</div>
            <div className="text-4xl font-bold tracking-tighter mt-2">{currentValue.toLocaleString()}</div>
            {change && <div className="text-xs text-muted-foreground mt-1">{change} {comparisonText}</div>}
        </Card>
    );
}
