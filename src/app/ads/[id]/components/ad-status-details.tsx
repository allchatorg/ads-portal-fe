import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {AdStatusDetails as AdStatusDetailsType} from "@/models/ad-status-details";
import {clsx} from "clsx";
import {AlertCircle, Calendar, CheckCircle, CreditCard, DollarSign, Eye, Info, TrendingUp} from "lucide-react";
import * as React from "react";
import {RejectAdModal} from "@/app/ads/[id]/components/reject-ad-modal";

interface AdStatusDetailsProps {
    data: AdStatusDetailsType;
    className?: string;
    isAdmin?: boolean;
    onApprove?: () => void;
    onReject?: (reason: string) => void;
}

export function AdStatusDetails({data, className, isAdmin = false, onApprove, onReject}: AdStatusDetailsProps) {
    const isActive = data.approvalState === "active" || data.approvalState === "completed";
    const isSubmitted = data.approvalState === "submitted";
    const showAdminActions = isAdmin && isSubmitted;

    // Status-based styling
    const getStatusConfig = () => {
        switch (data.approvalState) {
            case "active":
                return {
                    bg: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900",
                    badgeVariant: "default" as const,
                    badgeClass: "bg-green-500 hover:bg-green-600 text-white",
                };
            case "completed":
                return {
                    bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
                    badgeVariant: "default" as const,
                    badgeClass: "bg-blue-500 hover:bg-blue-600 text-white",
                };
            case "submitted":
                return {
                    bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900",
                    badgeVariant: "default" as const,
                    badgeClass: "bg-amber-500 hover:bg-amber-600 text-white",
                };
            case "rejected":
                return {
                    bg: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900",
                    badgeVariant: "destructive" as const,
                    badgeClass: "bg-red-500 hover:bg-red-600 text-white",
                };
            default:
                return {
                    bg: "bg-muted/50",
                    badgeVariant: "secondary" as const,
                    badgeClass: "",
                };
        }
    };

    const statusConfig = getStatusConfig();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    return (
        <Card className={clsx("border shadow-sm", statusConfig.bg, className)}>
            <CardHeader className="border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <CardTitle className="text-xl">{data.title}</CardTitle>
                        <CardDescription className="mt-1">Ad ID: #{data.id}</CardDescription>
                    </div>
                    <Badge className={clsx("w-fit", statusConfig.badgeClass)}>
                        {data.approvalState.toUpperCase()}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                {/* Ad Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Ad Type */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-background">
                            <TrendingUp className="h-5 w-5 text-muted-foreground"/>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Ad Type</p>
                            <p className="text-base font-semibold capitalize">{data.adType}</p>
                        </div>
                    </div>

                    {/* Views Bought */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-background">
                            <Eye className="h-5 w-5 text-muted-foreground"/>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Views Bought</p>
                            <p className="text-base font-semibold">{data.viewsBought.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Price Per View */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-background">
                            <DollarSign className="h-5 w-5 text-muted-foreground"/>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Price Per View</p>
                            <p className="text-base font-semibold">{formatCurrency(data.price)}</p>
                        </div>
                    </div>

                    {/* Total Price Paid */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-background">
                            <DollarSign className="h-5 w-5 text-muted-foreground"/>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Price Paid</p>
                            <p className="text-base font-semibold">{formatCurrency(data.totalPricePaid)}</p>
                        </div>
                    </div>

                    {/* Purchase Date */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-background">
                            <Calendar className="h-5 w-5 text-muted-foreground"/>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Purchase Date</p>
                            <p className="text-base font-semibold">{formatDate(data.purchaseDate)}</p>
                        </div>
                    </div>

                    {/* Start Date */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-background">
                            <Calendar className="h-5 w-5 text-muted-foreground"/>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                            <p className="text-base font-semibold">{formatDate(data.startDate)}</p>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-background">
                            <CreditCard className="h-5 w-5 text-muted-foreground"/>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                            <p className="text-base font-semibold capitalize">
                                {data.paymentCardBrand} •••• {data.paymentCardLast4}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Admin Actions Section - Bottom Right */}
                {showAdminActions && (
                    <div className="border-t pt-6 mt-6">
                        <div className="flex justify-end">
                            <div
                                className="w-full sm:w-auto sm:min-w-[360px] sm:max-w-md p-4 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-900 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <div
                                        className="h-7 w-7 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                    <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                                        Review Required
                                    </h3>
                                </div>
                                <p className="text-xs text-purple-700 dark:text-purple-300 mb-4 leading-relaxed">
                                    Review the ad content and take action.
                                </p>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        onClick={onApprove}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4"/>
                                        Approve Ad
                                    </Button>
                                    {onReject && <RejectAdModal onReject={onReject}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Conditional Rejection Section */}
                {data.approvalState === "rejected" && data.rejectionReason && (
                    <div className="border-t pt-6 mt-6">
                        <div
                            className="flex items-start gap-3 p-4 rounded-lg bg-red-100 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5"/>
                            <div>
                                <h3 className="text-sm font-semibold text-red-900 dark:text-red-100">
                                    Rejection Reason
                                </h3>
                                <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                                    {data.rejectionReason}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Conditional Pending Section */}
                {data.approvalState === "submitted" && !showAdminActions && (
                    <div className="border-t pt-6 mt-6">
                        <div
                            className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"/>
                            <div>
                                <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                                    Ad Under Review
                                </h3>
                                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                                    Your ad is currently being reviewed. This process typically takes 1-2 days maximum.
                                    You'll be notified via mail once your ad is approved and starts running.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}