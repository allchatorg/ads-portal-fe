import {ChartAreaInteractive} from "@/components/chart-area-interactive"
import {AdsTable} from "@/components/ads-table"
import {SectionCards} from "@/components/section-cards"
import {SiteHeader} from "@/components/site-header"
import {AdItem} from "@/models/ad-item"

import adsData from "./ads.json"

const ads = adsData as AdItem[]

export default function Page() {
    return (<div>
        <SiteHeader title={'Dashboard'} description={'Overview of you ads performance'}/>
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards/>
                    <div className="px-4 lg:px-6">
                        <ChartAreaInteractive/>
                    </div>
                    <div className="px-4 lg:px-6">
                        <h2 className="text-xl font-semibold mb-3">Active ads</h2>
                        <AdsTable ads={ads}/>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
