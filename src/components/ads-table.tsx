"use client"

import * as React from "react"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {AdApprovalState, AdItem, AdType} from "@/models/ad-item"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {DatePicker} from "@/components/ui/date-picker"
import {ArrowUpDown, Eye, Search, X} from "lucide-react"
import {useRouter} from "next/navigation"

interface AdsTableProps {
    ads: AdItem[]
    status?: string | null
    type?: string | null
    sort?: string
    onStatusChange?: (value: string | null) => void
    onTypeChange?: (value: string | null) => void
    onSortChange?: (value: string) => void
    onClearFilters?: () => void
    counts?: {
        all: number
        active: number
        submitted: number
        completed: number
        rejected: number
    }
    viewDetailsPath?: string
    isAdmin?: boolean
    startDate?: Date
    endDate?: Date
    searchQuery?: string
    onStartDateChange?: (date: Date | undefined) => void
    onEndDateChange?: (date: Date | undefined) => void
    onSearchQueryChange?: (value: string) => void
}

export function AdsTable({
                             ads,
                             status,
                             type,
                             sort,
                             onStatusChange,
                             onTypeChange,
                             onSortChange,
                             onClearFilters,
                             counts,
                             viewDetailsPath,
                             isAdmin = false,
                             startDate,
                             endDate,
                             searchQuery,
                             onStartDateChange,
                             onEndDateChange,
                             onSearchQueryChange
                         }: AdsTableProps) {
    const router = useRouter()

    const getStatusVariant = (status: AdApprovalState) => {
        switch (status) {
            case "active":
                return "default"
            case "submitted":
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

    const toggleSort = () => {
        if (!onSortChange || !sort) return
        const [field, order] = sort.split(",")
        if (field === "purchaseDate") {
            onSortChange(`purchaseDate,${order === "asc" ? "desc" : "asc"}`)
        } else {
            onSortChange("purchaseDate,desc")
        }
    }

    const clearFilters = () => {
        if (onClearFilters) {
            onClearFilters()
        } else {
            if (onStatusChange) onStatusChange(null)
            if (onTypeChange) onTypeChange(null)
            if (onStartDateChange) onStartDateChange(undefined)
            if (onEndDateChange) onEndDateChange(undefined)
            if (onSearchQueryChange) onSearchQueryChange("")
        }
    }

    const hasFilters = status !== null || type !== null || !!startDate || !!endDate || !!searchQuery
    const showFilters = !!onStatusChange && !!onTypeChange

    return (
        <div className="space-y-4">
            {showFilters && (
                <Tabs
                    defaultValue="all"
                    value={status || "all"}
                    onValueChange={(val) => onStatusChange?.(val === "all" ? null : val)}
                    className="w-full"
                >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <Select
                            value={status || "all"}
                            onValueChange={(val) => onStatusChange?.(val === "all" ? null : val)}
                        >
                            <SelectTrigger className="w-[150px] lg:hidden">
                                <SelectValue placeholder="Filter by Status"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses ({counts?.all || 0})</SelectItem>
                                <SelectItem value="active">Active ({counts?.active || 0})</SelectItem>
                                <SelectItem value="submitted">Submitted ({counts?.submitted || 0})</SelectItem>
                                <SelectItem value="rejected">Rejected ({counts?.rejected || 0})</SelectItem>
                                <SelectItem value="completed">Completed ({counts?.completed || 0})</SelectItem>
                            </SelectContent>
                        </Select>

                        <TabsList className="hidden lg:flex h-9">
                            <TabsTrigger value="all">
                                All <Badge variant="secondary"
                                           className="ml-2 rounded-full px-1">{counts?.all || 0}</Badge>
                            </TabsTrigger>
                            <TabsTrigger value="active">
                                Active <Badge variant="secondary"
                                              className="ml-2 rounded-full px-1">{counts?.active || 0}</Badge>
                            </TabsTrigger>
                            <TabsTrigger value="submitted">
                                Submitted <Badge variant="secondary"
                                                 className="ml-2 rounded-full px-1">{counts?.submitted || 0}</Badge>
                            </TabsTrigger>
                            <TabsTrigger value="completed">
                                Completed <Badge variant="secondary"
                                                 className="ml-2 rounded-full px-1">{counts?.completed || 0}</Badge>
                            </TabsTrigger>
                            <TabsTrigger value="rejected">
                                Rejected <Badge variant="secondary"
                                                className="ml-2 rounded-full px-1">{counts?.rejected || 0}</Badge>
                            </TabsTrigger>
                        </TabsList>

                        {!isAdmin && (
                            <Select
                                value={type || "all"}
                                onValueChange={(val) => onTypeChange?.(val === "all" ? null : val)}
                            >
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Filter by Type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="photo">Photo</SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                </SelectContent>
                            </Select>
                        )}

                        <div className="flex items-center gap-2">
                            {hasFilters && (
                                <Button variant="ghost" onClick={clearFilters} className="h-8 px-2 lg:px-3">
                                    Reset
                                    <X className="ml-2 h-4 w-4"/>
                                </Button>
                            )}
                        </div>
                    </div>
                </Tabs>
            )}

            {isAdmin && (
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 pb-2">
                    <div className="relative flex-1 w-full lg:max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="text"
                            placeholder="Search by email or user ID..."
                            value={searchQuery || ""}
                            onChange={(e) => onSearchQueryChange?.(e.target.value)}
                            className="h-9 pl-9 w-full"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
                        <DatePicker
                            value={startDate}
                            onChange={(date) => onStartDateChange?.(date)}
                            placeholder="Start Date"
                            className="w-full sm:w-[150px]"
                        />
                        <span className="hidden sm:inline text-sm text-muted-foreground">to</span>
                        <DatePicker
                            value={endDate}
                            onChange={(date) => onEndDateChange?.(date)}
                            placeholder="End Date"
                            className="w-full sm:w-[150px]"
                        />
                    </div>

                    <Select
                        value={type || "all"}
                        onValueChange={(val) => onTypeChange?.(val === "all" ? null : val)}
                    >
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Filter by Type"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="photo">Photo</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Views Bought</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Total Paid</TableHead>
                            <TableHead>
                                {onSortChange && sort ? (
                                    <Button
                                        variant="ghost"
                                        onClick={toggleSort}
                                        className="-ml-4 h-8 data-[state=open]:bg-accent"
                                    >
                                        Purchase Date
                                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                                    </Button>
                                ) : (
                                    "Purchase Date"
                                )}
                            </TableHead>
                            <TableHead>Start Date</TableHead>
                            {isAdmin && <TableHead>Email</TableHead>}
                            {isAdmin && <TableHead>User ID</TableHead>}
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ads.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="h-24 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2 py-8">
                                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                                        </svg>
                                        <p className="font-medium text-muted-foreground">No ads found</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            ads.map((ad) => (
                                <TableRow key={ad.id}>
                                    <TableCell className="font-medium">{ad.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline"
                                               className={`px-2.5 py-0.5 capitalize font-medium ${getTypeColor(ad.adType)}`}>
                                            {ad.adType}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{ad.viewsBought.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">${ad.price.toFixed(2)}</TableCell>
                                    <TableCell
                                        className="text-right font-semibold">${ad.totalPricePaid.toFixed(2)}</TableCell>
                                    <TableCell
                                        className="text-muted-foreground">{formatDate(ad.purchaseDate)}</TableCell>
                                    <TableCell className="text-muted-foreground">{formatDate(ad.startDate)}</TableCell>
                                    {isAdmin && <TableCell>{ad.username}</TableCell>}
                                    {isAdmin && <TableCell className="text-muted-foreground">{ad.userId}</TableCell>}
                                    <TableCell>
                                        <Badge variant={getStatusVariant(ad.approvalState)}
                                               className="px-2.5 py-0.5 capitalize font-medium">
                                            {ad.approvalState}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => router.push(viewDetailsPath ? `${viewDetailsPath}` : `/admin/ads/${ad.id}`)}
                                        >
                                            View Details
                                            <Eye className="ml-2 h-4 w-4"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
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
