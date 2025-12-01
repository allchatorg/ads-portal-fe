'use client'
import {SiteHeader} from "@/components/site-header";
import {AdDetailsStats} from "@/app/ads/[id]/components/ad-details-stats";
import {AdStatusDetails} from "@/app/ads/[id]/components/ad-status-details";
import {AdStatusDetails as AdStatusDetailsType} from "@/models/ad-status-details";
import {ActionButton} from "@/components/ui/action-button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Calendar, CheckCircle, DollarSign, Mail, Shield, TrendingUp, User} from "lucide-react";
import {RejectAdModal} from "@/app/ads/[id]/components/reject-ad-modal";
import {MOCK_USERS} from "@/data/mock-users";
import {useRouter} from "next/navigation";

// Mock data for demonstration - replace with actual API data
const mockAdStatusData: AdStatusDetailsType = {
    id: 12345,
    title: "Summer Sale Campaign 2024",
    adType: "photo",
    viewsBought: 50000,
    price: 0.05,
    totalPricePaid: 2500,
    purchaseDate: "2024-06-01",
    startDate: "2024-06-15",
    approvalState: "submitted",
    rejectionReason: "Innapropriate content, your payment will be refunded.",
    paymentCardLast4: "4242",
    paymentCardBrand: "visa",
    currentViews: 35000,
    servedViews: 12400,
    username: "johndoe",
    userId: "u_1", // Changed to match mock user data
};

export default function AdminAdDetailsPage() {
    const router = useRouter();
    const isSubmitted = mockAdStatusData.approvalState === "submitted";

    // Get user details from mock data
    const userData = MOCK_USERS.find(user => user.id === mockAdStatusData.userId);

    const handleApprove = () => {
        console.log("Ad approved - ID:", mockAdStatusData.id);
        // TODO: Implement API call to approve ad
    };

    const handleReject = (reason: string) => {
        console.log("Ad rejected - ID:", mockAdStatusData.id);
        console.log("Rejection reason:", reason || "No reason provided");
        // TODO: Implement API call to reject ad
    };

    const handleViewProfile = () => {
        router.push(`/admin/users/${mockAdStatusData.userId}`);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const actions = isSubmitted ? (
        <>
            <ActionButton onClick={handleApprove}>
                <CheckCircle className="mr-2 h-4 w-4"/>
                Approve
            </ActionButton>
            <RejectAdModal onReject={handleReject}/>
            <ActionButton
                onClick={handleViewProfile}
                variant="default"
                className="bg-transparent border border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950/50 shadow-none"
            >
                <User className="mr-2 h-4 w-4"/>
                View Profile
            </ActionButton>
        </>
    ) : (
        <ActionButton
            onClick={handleViewProfile}
            variant="default"
            className="bg-transparent border border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950/50 shadow-none"
        >
            <User className="mr-2 h-4 w-4"/>
            View Profile
        </ActionButton>
    );

    return (
        <div>
            <SiteHeader
                title={'Ad Campaign Details'}
                description={''}
            />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4">
                        <AdDetailsStats
                            approvalState={mockAdStatusData.approvalState}
                            isAdmin={true}
                            actions={actions}
                        />

                        {/* User Details Section */}
                        {userData && (
                            <Card
                                className="m-4 border shadow-sm bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-950/20 dark:to-indigo-950/20 border-violet-200 dark:border-violet-900">
                                <CardHeader className="border-b border-violet-200 dark:border-violet-900">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <User className="h-5 w-5 text-violet-600 dark:text-violet-400"/>
                                        User Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* User Name */}
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-background shadow-sm">
                                                <User className="h-5 w-5 text-violet-600 dark:text-violet-400"/>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Name</p>
                                                <p className="text-base font-semibold">{userData.name}</p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-background shadow-sm">
                                                <Mail className="h-5 w-5 text-violet-600 dark:text-violet-400"/>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                                <p className="text-base font-semibold break-all">{userData.email}</p>
                                            </div>
                                        </div>

                                        {/* Role */}
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-background shadow-sm">
                                                <Shield className="h-5 w-5 text-violet-600 dark:text-violet-400"/>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Role</p>
                                                <Badge
                                                    className="mt-1 bg-violet-600 hover:bg-violet-700 text-white capitalize">
                                                    {userData.role}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Total Ads */}
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-background shadow-sm">
                                                <TrendingUp className="h-5 w-5 text-violet-600 dark:text-violet-400"/>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Total Ads
                                                    Purchased</p>
                                                <p className="text-base font-semibold">{userData.totalPurchasedAds}</p>
                                            </div>
                                        </div>

                                        {/* Total Spent */}
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-background shadow-sm">
                                                <DollarSign className="h-5 w-5 text-violet-600 dark:text-violet-400"/>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                                                <p className="text-base font-semibold">{formatCurrency(userData.totalSpent)}</p>
                                            </div>
                                        </div>

                                        {/* Member Since */}
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-background shadow-sm">
                                                <Calendar className="h-5 w-5 text-violet-600 dark:text-violet-400"/>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Member
                                                    Since</p>
                                                <p className="text-base font-semibold">{formatDate(userData.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <AdStatusDetails
                            className="m-4"
                            data={mockAdStatusData}
                            isAdmin={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
