'use client'

import {SiteHeader} from "@/components/site-header";
import {AdDetailsStats} from "@/app/ads/[id]/components/ad-details-stats";
import {AdStatusDetails} from "@/app/ads/[id]/components/ad-status-details";
import {AdStatusDetails as AdStatusDetailsType} from "@/models/ad-status-details";
import {useUser} from "@/hooks/use-user";
import {UserRole} from "@/models/user-role";

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

export default function Page() {
    const {user} = useUser();
    const isAdmin = user?.role === UserRole.ADMIN;

    const handleApprove = () => {
        console.log("Ad approved - ID:", mockAdStatusData.id);
        // TODO: Implement API call to approve ad
    };

    const handleReject = (reason: string) => {
        console.log("Ad rejected - ID:", mockAdStatusData.id);
        console.log("Rejection reason:", reason || "No reason provided");
        // TODO: Implement API call to reject ad
    };

    return (
        <div>
            <SiteHeader title={'Ad Campaign Details'} description={''}/>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4">
                        <AdDetailsStats approvalState={mockAdStatusData.approvalState}/>

                        <AdStatusDetails
                            className="m-4"
                            data={mockAdStatusData}
                            isAdmin={isAdmin}
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}