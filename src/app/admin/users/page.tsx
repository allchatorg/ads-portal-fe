"use client"

import {SiteHeader} from "@/components/site-header"
import {UsersTable} from "@/components/users-table"
import {useUsersParams} from "@/hooks/use-users-params"
import {MOCK_USERS} from "@/data/mock-users"
import {useMemo} from "react"

export default function AdminUsersPage() {
    const {
        sort,
        searchQuery,
        setSort,
        setSearchQuery,
        clearParams
    } = useUsersParams()

    const filteredUsers = useMemo(() => {
        let result = [...MOCK_USERS]

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(user =>
                user.email.toLowerCase().includes(query) ||
                user.id.toLowerCase().includes(query) ||
                user.name.toLowerCase().includes(query)
            )
        }

        // Sort
        const [sortField, sortOrder] = sort.split(",")

        result.sort((a, b) => {
            let valA = a[sortField as keyof typeof a]
            let valB = b[sortField as keyof typeof b]

            // Handle numeric sorting
            if (sortField === 'totalPurchasedAds' || sortField === 'totalSpent') {
                valA = Number(valA)
                valB = Number(valB)
            }

            if (valA < valB) return sortOrder === "asc" ? -1 : 1
            if (valA > valB) return sortOrder === "asc" ? 1 : -1
            return 0
        })

        return result
    }, [sort, searchQuery])

    return (
        <div className="w-full">
            <SiteHeader
                title="Users Management"
                description="Manage platform users and view their activity"
            />
            <div className="w-full px-4 lg:px-6 py-4 md:gap-6 md:py-6">
                <UsersTable
                    users={filteredUsers}
                    sort={sort}
                    onSortChange={setSort}
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    onClearFilters={clearParams}
                />
            </div>
        </div>
    )
}
