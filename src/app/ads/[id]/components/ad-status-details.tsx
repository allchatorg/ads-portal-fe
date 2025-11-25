import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {AdStatusDetails as AdStatusDetailsType} from "@/models/ad-status-details";
import {clsx} from "clsx";
import {AlertCircle, Calendar, CreditCard, DollarSign, Eye, TrendingUp} from "lucide-react";
import * as React from "react";

interface AdStatusDetailsProps {
    data: AdStatusDetailsType;
    className?: string;
}

export function AdStatusDetails({data, className}: AdStatusDetailsProps) {
    const isActive = data.approvalState === "active" || data.approvalState === "completed";
    const showStats = isActive;

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
            case "pending":
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
            </CardContent>
        </Card>
    );
}
