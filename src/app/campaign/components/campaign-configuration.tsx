'use client';

import { useCallback, useMemo } from "react";
import { AdType } from "@/models/adType";
import { CampaignDetails, ValidationErrors } from "@/hooks/use-campaign-creator";
import { AdOption } from "@/models/AdOption";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, CheckCircle2, Upload, X, ChevronLeft, Info } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/ui/action-button";

interface CampaignConfigurationProps {
    adType: AdType;
    details: CampaignDetails;
    setDetails: (value: React.SetStateAction<CampaignDetails>) => void;
    errors: ValidationErrors;
    onNext: () => void;
    onBack: () => void;
    adOptions: AdOption[];
}

export default function CampaignConfiguration({
    adType,
    details,
    setDetails,
    errors,
    onNext,
    onBack,
    adOptions
}: CampaignConfigurationProps) {

    const currentOption = adOptions.find(o => o.id === adType);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Simulate upload by creating a local URL
            const url = URL.createObjectURL(file);
            setDetails(prev => ({
                ...prev,
                media: file,
                mediaUrl: url
            }));
        }
    }, [setDetails]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setDetails(prev => ({
                ...prev,
                media: file,
                mediaUrl: url
            }));
        }
    }, [setDetails]);

    const removeMedia = () => {
        setDetails(prev => ({
            ...prev,
            media: null,
            mediaUrl: null
        }));
    };

    const totalPrice = useMemo(() => {
        if (!currentOption) return 0;
        return (details.views / 1000) * currentOption.pricePerMille;
    }, [details.views, currentOption]);

    if (!currentOption) return null;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="w-full border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-200 px-8 py-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <currentOption.icon className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold text-slate-900">Configure {currentOption.title}</CardTitle>
                            <CardDescription className="text-slate-500 text-sm">Fill in the details for your campaign</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Configuration Inputs */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Campaign Name */}
                            <div className="space-y-2">
                                <Label htmlFor="campaign-name" className="text-sm font-semibold text-slate-700">Campaign Name</Label>
                                <Input
                                    id="campaign-name"
                                    type="text"
                                    value={details.name}
                                    onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g., Summer Sale 2024"
                                    className={`${errors.name ? 'border-red-300 focus-visible:ring-red-200' : 'border-slate-200 focus-visible:ring-indigo-200'}`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="space-y-2">
                                <Label htmlFor="ad-text" className="text-sm font-semibold text-slate-700">Ad Text Content</Label>
                                <Textarea
                                    id="ad-text"
                                    value={details.text}
                                    onChange={(e) => setDetails(prev => ({ ...prev, text: e.target.value }))}
                                    placeholder="Enter the primary text for your advertisement..."
                                    rows={4}
                                    className={`resize-none ${errors.text ? 'border-red-300 focus-visible:ring-red-200' : 'border-slate-200 focus-visible:ring-indigo-200'}`}
                                />
                                {errors.text && (
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.text}
                                    </p>
                                )}
                            </div>

                            {/* Media Upload - Only for non-text ads */}
                            {adType !== 'text' && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-slate-700">
                                        {adType === 'video' ? 'Video Asset' : 'Image Asset'}
                                    </Label>

                                    {!details.mediaUrl ? (
                                        <div
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleDrop}
                                            className={`border-2 border-dashed ${errors.media ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'} rounded-xl p-8 text-center transition-colors cursor-pointer relative`}
                                        >
                                            <input
                                                type="file"
                                                accept={adType === 'video' ? "video/*" : "image/*"}
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 bg-white rounded-full shadow-sm">
                                                    <Upload className="w-6 h-6 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">Click to upload or drag and drop</p>
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        {adType === 'video' ? 'MP4, WebM up to 50MB' : 'PNG, JPG up to 10MB'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video flex items-center justify-center group">
                                            {adType === 'video' ? (
                                                <video src={details.mediaUrl} controls className="max-h-full max-w-full" />
                                            ) : (
                                                <Image
                                                    src={details.mediaUrl}
                                                    alt="Preview"
                                                    fill
                                                    className="object-contain"
                                                />
                                            )}
                                            <button
                                                onClick={removeMedia}
                                                className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white text-red-600 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                    {errors.media && (
                                        <p className="text-red-500 text-xs flex items-center gap-1">
                                            <AlertCircle size={12} /> {errors.media}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Views Slider */}
                            <div className="space-y-6 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-semibold text-slate-700">Target Views</Label>
                                    <span className="text-2xl font-bold text-indigo-600">
                                        {details.views.toLocaleString()}
                                    </span>
                                </div>
                                <Slider
                                    defaultValue={[details.views]}
                                    max={1000000}
                                    min={1000}
                                    step={1000}
                                    onValueChange={(vals) => setDetails(prev => ({ ...prev, views: vals[0] }))}
                                    className="py-4"
                                />
                            </div>
                        </div>

                        {/* Right Column: Pricing Summary */}
                        <div className="lg:col-span-1 flex flex-col justify-end">
                            <div className="bg-slate-900 rounded-xl p-6 text-white">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-400">Price per 1,000 views (CPM)</span>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="w-4 h-4 text-slate-500 hover:text-slate-300 transition-colors" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-xs">Cost Per Mille (CPM) is the cost for every 1,000 views of your advertisement.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <span className="font-medium">${currentOption.pricePerMille.toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-slate-800 my-4" />
                                <div className="flex items-center justify-between text-lg">
                                    <span className="font-semibold">Total Estimated Cost</span>
                                    <span className="font-bold text-2xl text-indigo-300">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="px-8 py-6 border-t border-slate-200 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div className="flex items-center gap-4">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors cursor-help">
                                    <Info className="w-4 h-4" />
                                    <span className="text-xs">Approval Process</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">After purchasing the ad, it will go through an approval process and will only become active once approved.</p>
                            </TooltipContent>
                        </Tooltip>
                        <ActionButton
                            onClick={onNext}
                            icon={CheckCircle2}
                        >
                            Next Step
                        </ActionButton>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
