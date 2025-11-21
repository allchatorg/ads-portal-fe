"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AdApprovalState, AdItem, AdType } from "@/models/ad-item";

export function AdsTable({ ads }: { ads: AdItem[] }) {
    const rows = React.useMemo(
        () => ads.filter((a) => a.approvalState === "pending" || a.approvalState === "running"),
        [ads]
    )

    const getStatusVariant = (status: AdApprovalState) => {
        switch (status) {
            case "running":
                return "default"
            case "pending":
                return "secondary"
            default:
                return "outline"
        }
    }

    const getTypeColor = (type: AdType) => {
        switch (type) {
            case "video":
                return "bg-purple-50 text-purple-700 border-purple-200"
            case "photo":
                return "bg-blue-50 text-blue-700 border-blue-200"
            case "text":
                return "bg-gray-50 text-gray-700 border-gray-200"
            default:
                return ""
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Views Bought</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total Paid</TableHead>
                        <TableHead>Purchase Date</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                                <div className="flex flex-col items-center justify-center gap-2 py-8">
                                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <p className="font-medium text-muted-foreground">No running or pending ads</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((ad) => (
                            <TableRow key={ad.id}>
                                <TableCell className="font-medium">{ad.title}</TableCell>
                                <TableCell>
                                    <Badge variant="outline"
                                        className={`px-2.5 py-0.5 capitalize font-medium ${getTypeColor(ad.adType)}`}>
                                        {ad.adType}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {ad.viewsBought.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    ${ad.price.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                    ${ad.totalPricePaid.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-muted-foreground">{formatDate(ad.purchaseDate)}</TableCell>
                                <TableCell className="text-muted-foreground">{formatDate(ad.startDate)}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(ad.approvalState)}
                                        className="px-2.5 py-0.5 capitalize font-medium">
                                        {ad.approvalState}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

function formatDate(d: string) {
    const date = new Date(d)
    if (isNaN(date.getTime())) return d
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}