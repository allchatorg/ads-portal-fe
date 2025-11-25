'use client'

import {SiteHeader} from "@/components/site-header";
import {AdDetailsStats} from "@/app/ads/[id]/components/ad-details-stats";

export default function Page() {
    return (<div>
        <SiteHeader title={'Ad Campaign Details'} description={''}/>
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4">
                    <AdDetailsStats/>
                </div>
            </div>
        </div>
    </div>)
}
