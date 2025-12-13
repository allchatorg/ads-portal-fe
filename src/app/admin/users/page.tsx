"use client"

import {useMemo, useState} from "react"
import {useGetUsersQuery} from "@/store/services/adminUsersApi"
import {SiteHeader} from "@/components/site-header"
import {UsersTable} from "@/components/users-table"
import {useUsersParams} from "@/hooks/use-users-params"

import {sortParamsToQueryString} from "@/lib/utils"

export default function AdminUsersPage() {
    const [page, setPage] = useState(0)
    const [size] = useState(10)

    const {
        sort,
        searchQuery,
        setSort,
        setSearchQuery,
        clearParams
    } = useUsersParams()

    // Parse search query to determine if it's a User ID or Email
    const {userId, email} = useMemo(() => {
        if (!searchQuery) return {userId: undefined, email: undefined}

        const isNumeric = /^\d+$/.test(searchQuery)
        if (isNumeric) {
            return {userId: parseInt(searchQuery), email: undefined}
        }
        return {userId: undefined, email: searchQuery}
    }, [searchQuery])

    const formattedSort = useMemo(() => {
        if (!sort) return undefined
        const [field, direction] = sort.split(",")
        return sortParamsToQueryString([{
            id: field,
            desc: direction === "desc"
        }])
    }, [sort])

    const {data, isLoading} = useGetUsersQuery({
        page,
        size,
        sort: formattedSort,
        userId,
        email
    })

    const users = data?.content || []
    const totalPages = data?.totalPages || 0

    return (
        <div className="w-full">
            <SiteHeader
                title="Users Management"
                description="Manage platform users and view their activity"
            />
            <div className="w-full px-4 lg:px-6 py-4 md:gap-6 md:py-6">
                <UsersTable
                    users={users}
                    sort={sort}
                    onSortChange={setSort}
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    onClearFilters={clearParams}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}
