import {SiteHeader} from "@/components/site-header"

export default function AdminAdsPage() {
    return (
        <div>
            <SiteHeader
                title="Ads Management"
                description="Manage and review all platform advertisements"
            />
            <div className="w-full flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6">
                            {/* Add your ads management content here */}
                            <p className="text-muted-foreground">Ads management content goes here...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
