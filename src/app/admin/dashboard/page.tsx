import {SiteHeader} from "@/components/site-header"

export default function AdminDashboardPage() {
    return (
        <div>
            <SiteHeader
                title="Admin Dashboard"
                description="Overview of platform analytics and metrics"
            />
            <div className="w-full flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6">
                            {/* Add your admin dashboard content here */}
                            <p className="text-muted-foreground">Admin dashboard content goes here...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
