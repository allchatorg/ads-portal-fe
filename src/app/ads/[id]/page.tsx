'use client'

import {SiteHeader} from "@/components/site-header";
import {AdDetailsStats} from "@/app/ads/[id]/components/ad-details-stats";
import {AdStatusDetails} from "@/app/ads/[id]/components/ad-status-details";
import {AdStatusDetails as AdStatusDetailsType} from "@/models/ad-status-details";
import {Info} from "lucide-react";

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
    approvalState: "completed",
    rejectionReason: "Innapropriate content",
    paymentCardLast4: "4242",
    paymentCardBrand: "visa",
    currentViews: 35000,
    servedViews: 12400,
};

export default function Page() {
    return (<div>
        <SiteHeader title={'Ad Campaign Details'} description={''}/>
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4">
                    <AdDetailsStats approvalState={mockAdStatusData.approvalState}/>
                    {mockAdStatusData.approvalState === "pending" && (
                        <div
                            className="mx-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 flex items-start gap-3">
                            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"/>
                            <div>
                                <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                                    Ad Under Review
                                </h3>
                                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                                    Your ad is currently being reviewed. This process typically takes 1-2 days maximum.
                                    You'll be notified once your ad is approved and starts running.
                                </p>
                            </div>
                        </div>
                    )}
                    <AdStatusDetails className="m-4" data={mockAdStatusData}/>
                </div>
            </div>
        </div>
    </div>)
}
