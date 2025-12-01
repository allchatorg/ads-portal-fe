"use client";
import {useParams} from "next/navigation";
import {useMemo, useState} from "react";
import {MOCK_USERS} from "@/data/mock-users";
import {MOCK_ADS} from "@/data/mock-ads";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AdsTable} from "@/components/ads-table";

export default function UserAdsPage() {
    const params = useParams();
    const [status, setStatus] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [sort, setSort] = useState<string>("purchaseDate,desc");

    const user = useMemo(() => {
        return MOCK_USERS.find(u => u.id === params.id);
    }, [params.id]);

    // Filter ads by userId
    const userAds = useMemo(() => {
        if (!user) return [];
        return MOCK_ADS.filter(ad => ad.userId === user.id);
    }, [user]);

    // Apply filters and sorting
    const filteredAds = useMemo(() => {
        let filtered = [...userAds];

        // Filter by status
        if (status) {
            filtered = filtered.filter(ad => ad.approvalState === status);
        }

        // Filter by type
        if (type) {
            filtered = filtered.filter(ad => ad.adType === type);
        }

        // Sort
        if (sort) {
            const [field, order] = sort.split(",");
            filtered.sort((a, b) => {
                if (field === "purchaseDate") {
                    const dateA = new Date(a.purchaseDate).getTime();
                    const dateB = new Date(b.purchaseDate).getTime();
                    return order === "asc" ? dateA - dateB : dateB - dateA;
                }
                return 0;
            });
        }

        return filtered;
    }, [userAds, status, type, sort]);

    // Calculate counts
    const counts = useMemo(() => {
        return {
            all: userAds.length,
            active: userAds.filter(ad => ad.approvalState === "active").length,
            submitted: userAds.filter(ad => ad.approvalState === "submitted").length,
            completed: userAds.filter(ad => ad.approvalState === "completed").length,
            rejected: userAds.filter(ad => ad.approvalState === "rejected").length,
        };
    }, [userAds]);

    const handleClearFilters = () => {
        setStatus(null);
        setType(null);
    };

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Ad Statistics</CardTitle>
                    <CardDescription>Summary of user&#39;s advertising activity</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                            <p className="text-2xl font-bold">{user.totalPurchasedAds}</p>
                            <p className="text-sm text-muted-foreground">Total Ads</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                            <p className="text-2xl font-bold text-green-600">
                                {userAds.filter(ad => ad.approvalState === 'active').length}
                            </p>
                            <p className="text-sm text-muted-foreground">Active Ads</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                            <p className="text-2xl font-bold text-orange-600">
                                {userAds.filter(ad => ad.approvalState === 'submitted').length}
                            </p>
                            <p className="text-sm text-muted-foreground">Submitted Ads</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>User Ads</CardTitle>
                    <CardDescription>
                        All advertisements created by {user.name}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AdsTable
                        ads={filteredAds}
                        status={status}
                        type={type}
                        sort={sort}
                        onStatusChange={setStatus}
                        onTypeChange={setType}
                        onSortChange={setSort}
                        onClearFilters={handleClearFilters}
                        counts={counts}
                        isAdmin={false}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
