'use client'
import {SiteHeader} from "@/components/site-header";
import {AdDetailsStats} from "@/app/ads/[id]/components/ad-details-stats";
import {AdStatusDetails} from "@/app/ads/[id]/components/ad-status-details";
import {AdStatusDetails as AdStatusDetailsType} from "@/models/ad-status-details";

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
    userId: "user-123",
};

export default function UserAdDetailsPage() {
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
                            isAdmin={false}
                        />

                        <AdStatusDetails
                            className="m-4"
                            data={mockAdStatusData}
                            isAdmin={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}