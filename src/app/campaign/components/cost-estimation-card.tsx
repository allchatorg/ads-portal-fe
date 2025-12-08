import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {AdFormatDto, AdFormatType} from "@/data/adFormats";
import {CampaignDetails} from "@/hooks/use-campaign-creator";
import {useMemo} from "react";
import {calculateAdCost} from "@/utils/pricing-utils";
import {Info} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

interface CostEstimationCardProps {
    details: CampaignDetails;
    setDetails: (value: React.SetStateAction<CampaignDetails>) => void;
    selectedFormat: AdFormatDto;
}

export default function CostEstimationCard({
                                               details,
                                               setDetails,
                                               selectedFormat
                                           }: CostEstimationCardProps) {

    const pricingData = useMemo(() => {
        return calculateAdCost(selectedFormat, details.text.length, details.views);
    }, [details.views, details.text.length, selectedFormat]);

    const {totalCost, baseCPM, textCPM, totalCPM} = pricingData;

    return (
        <Card className="border-slate-200 shadow-sm h-full">
            <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="space-y-8">
                    {/* Target Views Slider Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-semibold text-slate-900">Target Views</Label>
                            <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                                {details.views.toLocaleString()}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Slider
                                defaultValue={[details.views]}
                                value={[details.views]}
                                max={30000}
                                min={1000}
                                step={1000}
                                onValueChange={(vals) => setDetails(prev => ({...prev, views: vals[0]}))}
                                className="py-2"
                            />
                            <div className="flex justify-between text-xs text-slate-400 font-medium">
                                <span>1k views</span>
                                <span>30k views</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100"/>

                    {/* Cost Breakdown */}
                    <div className="space-y-3 text-sm">
                        {/* Show Base CPM if not a Text ad (or if strictly separate) */}
                        {selectedFormat.type !== AdFormatType.TEXT && (
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Base CPM</span>
                                <span className="font-medium text-slate-900">${baseCPM.toFixed(2)}</span>
                            </div>
                        )}

                        {/* Show Text Tier Info if Text Ad */}
                        {selectedFormat.type === AdFormatType.TEXT && (
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    <span className="text-slate-600">Tier Pricing ({details.text.length} chars)</span>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="w-3 h-3 text-slate-400 hover:text-slate-600 cursor-help"/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div className="text-xs space-y-1">
                                                <p className="font-semibold">Text Pricing Tiers:</p>
                                                {selectedFormat.pricingTiers?.map((tier, idx) => (
                                                    <p key={idx}>Up to {tier.maxCharacters} chars:
                                                        ${tier.pricePerMille} CPM</p>
                                                ))}
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <span className="font-medium text-slate-900">${textCPM.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="mt-2 pt-2 border-t border-slate-50 flex justify-between items-center">
                            <span className="text-slate-600 font-medium">Total CPM</span>
                            <span className="font-medium text-slate-900">${totalCPM.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Total Estimate */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-slate-900">Total Estimate</span>
                        <span className="text-3xl font-bold text-blue-600">
                            ${totalCost.toFixed(2)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

