"use client";
import {useParams, useRouter} from "next/navigation";
import {useMemo} from "react";
import {MOCK_USERS} from "@/data/mock-users";
import {MOCK_ADS} from "@/data/mock-ads";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Eye} from "lucide-react";
import {AdApprovalState} from "@/models/ad-item";

export default function UserAdsPage() {
    const params = useParams();
    const router = useRouter();

    const user = useMemo(() => {
        return MOCK_USERS.find(u => u.id === params.id);
    }, [params.id]);

    // Filter ads by userId
    const userAds = useMemo(() => {
        if (!user) return [];
        return MOCK_ADS.filter(ad => ad.userId === user.id);
    }, [user]);

    if (!user) {
        return <div>User not found</div>;
    }

    const getStatusVariant = (status: AdApprovalState) => {
        switch (status) {
            case 'active':
                return 'default';
            case 'submitted':
                return 'secondary';
            case 'rejected':
                return 'destructive';
            case 'completed':
                return 'outline';
            default:
                return 'outline';
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>User Ads</CardTitle>
                    <CardDescription>
                        All advertisements created by {user.name}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {userAds.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No ads found for this user
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ad ID</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userAds.map((ad) => (
                                        <TableRow key={ad.id}>
                                            <TableCell className="font-mono text-xs">
                                                {ad.id}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {ad.title}
                                            </TableCell>
                                            <TableCell className="capitalize">
                                                {ad.adType}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(ad.approvalState)}
                                                       className="capitalize">
                                                    {ad.approvalState}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {new Date(ad.purchaseDate).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => router.push(`/ads/${ad.id}`)}
                                                >
                                                    View
                                                    <Eye className="ml-2 h-4 w-4"/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

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
                            <p className="text-sm text-muted-foreground">Pending Ads</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
