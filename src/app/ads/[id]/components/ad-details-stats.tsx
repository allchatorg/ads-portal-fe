import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import * as React from 'react';
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {CartesianGrid, Line, LineChart, XAxis} from "recharts";
import {VerticalBarCard} from "@/app/ads/[id]/components/vertical-bar-card";
import {TotalViewsCard} from "@/app/ads/[id]/components/total-views-card";

const chartData = [
    { date: "2024-04-01", views: 222 },
    { date: "2024-04-02", views: 97 },
    { date: "2024-04-03", views: 167 },
    { date: "2024-04-04", views: 242 },
    { date: "2024-04-05", views: 373 },
    { date: "2024-04-06", views: 301 },
    { date: "2024-04-07", views: 245 },
    { date: "2024-04-08", views: 409 },
    { date: "2024-04-09", views: 59 },
    { date: "2024-04-10", views: 261 },
    { date: "2024-04-11", views: 327 },
    { date: "2024-04-12", views: 292 },
    { date: "2024-04-13", views: 342 },
    { date: "2024-04-14", views: 137 },
    { date: "2024-04-15", views: 120 },
    { date: "2024-04-16", views: 138 },
    { date: "2024-04-17", views: 446 },
    { date: "2024-04-18", views: 364 },
    { date: "2024-04-19", views: 243 },
    { date: "2024-04-20", views: 89 },
    { date: "2024-04-21", views: 137 },
    { date: "2024-04-22", views: 224 },
    { date: "2024-04-23", views: 138 },
    { date: "2024-04-24", views: 387 },
    { date: "2024-04-25", views: 215 },
    { date: "2024-04-26", views: 75 },
    { date: "2024-04-27", views: 383 },
    { date: "2024-04-28", views: 122 },
    { date: "2024-04-29", views: 315 },
    { date: "2024-04-30", views: 454 },
    { date: "2024-05-01", views: 165 },
    { date: "2024-05-02", views: 293 },
    { date: "2024-05-03", views: 247 },
    { date: "2024-05-04", views: 385 },
    { date: "2024-05-05", views: 481 },
    { date: "2024-05-06", views: 498 },
    { date: "2024-05-07", views: 388 },
    { date: "2024-05-08", views: 149 },
    { date: "2024-05-09", views: 227 },
    { date: "2024-05-10", views: 293 },
    { date: "2024-05-11", views: 335 },
    { date: "2024-05-12", views: 197 },
    { date: "2024-05-13", views: 197 },
    { date: "2024-05-14", views: 448 },
    { date: "2024-05-15", views: 473 },
    { date: "2024-05-16", views: 338 },
    { date: "2024-05-17", views: 499 },
    { date: "2024-05-18", views: 315 },
    { date: "2024-05-19", views: 235 },
    { date: "2024-05-20", views: 177 },
    { date: "2024-05-21", views: 82 },
    { date: "2024-05-22", views: 81 },
    { date: "2024-05-23", views: 252 },
    { date: "2024-05-24", views: 294 },
    { date: "2024-05-25", views: 201 },
    { date: "2024-05-26", views: 213 },
    { date: "2024-05-27", views: 420 },
    { date: "2024-05-28", views: 233 },
    { date: "2024-05-29", views: 78 },
    { date: "2024-05-30", views: 340 },
    { date: "2024-05-31", views: 178 },
    { date: "2024-06-01", views: 178 },
    { date: "2024-06-02", views: 470 },
    { date: "2024-06-03", views: 103 },
    { date: "2024-06-04", views: 439 },
    { date: "2024-06-05", views: 88 },
    { date: "2024-06-06", views: 294 },
    { date: "2024-06-07", views: 323 },
    { date: "2024-06-08", views: 385 },
    { date: "2024-06-09", views: 438 },
    { date: "2024-06-10", views: 155 },
    { date: "2024-06-11", views: 92 },
    { date: "2024-06-12", views: 492 },
    { date: "2024-06-13", views: 81 },
    { date: "2024-06-14", views: 426 },
    { date: "2024-06-15", views: 307 },
    { date: "2024-06-16", views: 371 },
    { date: "2024-06-17", views: 475 },
    { date: "2024-06-18", views: 107 },
    { date: "2024-06-19", views: 341 },
    { date: "2024-06-20", views: 408 },
    { date: "2024-06-21", views: 169 },
    { date: "2024-06-22", views: 317 },
    { date: "2024-06-23", views: 480 },
    { date: "2024-06-24", views: 132 },
    { date: "2024-06-25", views: 141 },
    { date: "2024-06-26", views: 434 },
    { date: "2024-06-27", views: 448 },
    { date: "2024-06-28", views: 149 },
    { date: "2024-06-29", views: 103 },
    { date: "2024-06-30", views: 446 },
]

const chartConfig = {
    views: {
        label: "Page Views",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const servedData = [
    { name: "Served", value: 12400, total: 15000 },
]

export function AdDetailsStats() {
    return (
        <Card className="py-0 border-none shadow-none rounded-none">
            <CardHeader className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between border-b">
                <div className="flex flex-col gap-1">
                    <CardTitle className="text-xl">Your Ad Performance</CardTitle>
                    <CardDescription>
                        Your ad performance is measured by the number of impressions and clicks.
                    </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <TotalViewsCard title={'Total Served Views'}
                                    currentValue={15000}
                                    previousValue={7000}
                                    className={'md:min-w-48 md:max-w-48'}/>
                    <VerticalBarCard title={"Served Views"}
                                     current={100}
                                     max={400}
                                     className={"md:min-w-48 md:max-w-48"}/>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Line
                            dataKey="views"
                            type="monotone"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};