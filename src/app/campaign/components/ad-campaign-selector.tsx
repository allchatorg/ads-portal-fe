'use client'
import {useState} from "react";
import {CheckCircle2, ChevronLeft, ChevronRight, ImageIcon, MousePointerClick, Play, Type} from "lucide-react";
import {AdOption} from "@/models/AdOption";
import {AdType} from "@/models/adType";
import {AdCard} from "@/app/campaign/components/ad-card";

// Define props interface
interface AdCampaignSelectorProps {
    selectedAd: AdType;
    onSelect: (type: AdType) => void;
    onNext: () => void;
}

const AD_OPTIONS: AdOption[] = [
    {
        id: 'text',
        title: 'Text Advertisement',
        description: 'High-intent focus. Best for search results and sidebar placements where reading is priority.',
        pricePerMille: 4.50,
        icon: Type,
        features: ['Headline (30 chars)', 'Description (90 chars)', 'Click-through URL']
    },
    {
        id: 'photo',
        title: 'Display / Photo Ad',
        description: 'Visual engagement. Ideal for feed interruptions and banner placements to build brand awareness.',
        pricePerMille: 8.75,
        icon: ImageIcon,
        features: ['1080x1080 or 16:9', 'PNG/JPG Support', 'Visual Call-to-Action']
    },
    {
        id: 'video',
        title: 'Video Commercial',
        description: 'Maximum conversion. Immersive storytelling for pre-roll or in-feed autoplay placements.',
        pricePerMille: 15.00,
        icon: Play,
        recommended: true,
        features: ['Up to 30 seconds', 'Auto-play enabled', 'Sound-on optional']
    }
];

export default function AdCampaignSelector({
                                               selectedAd,
                                               onSelect,
                                               onNext
                                           }: AdCampaignSelectorProps) {

    // We keep carousel index local as it's purely UI/View state
    const [currentMobileIndex, setCurrentMobileIndex] = useState(1);

    // Mobile Carousel Logic
    const nextSlide = () => {
        setCurrentMobileIndex((prev) => (prev === AD_OPTIONS.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentMobileIndex((prev) => (prev === 0 ? AD_OPTIONS.length - 1 : prev - 1));
    };

    return (
        <div className="flex flex-col items-center justify-center font-sans">
            <div>
                {/* Header Section */}
                <div className="text-center space-y-4 mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Choose your Ad Format
                    </h1>
                    <p className="text-slate-500 max-w-lg mx-auto text-lg">
                        Select the format that best suits your campaign goals.
                        Pricing is based on impressions (CPM).
                    </p>
                </div>

                {/* --- DESKTOP VIEW (Grid) --- */}
                <div className="hidden md:grid md:grid-cols-3 gap-6">
                    {AD_OPTIONS.map((option) => (
                        <div key={option.id} className="h-full">
                            <AdCard
                                option={option}
                                isSelected={selectedAd === option.id}
                                onSelect={onSelect} // Uses prop function
                            />
                        </div>
                    ))}
                </div>

                {/* --- MOBILE VIEW (Carousel) --- */}
                <div className="md:hidden relative w-full max-w-md mx-auto">
                    {/* Carousel Container */}
                    <div className="relative h-[480px] w-full perspective-1000">
                        {AD_OPTIONS.map((option, index) => {
                            if (index !== currentMobileIndex) return null;
                            return (
                                <div key={option.id} className="animate-in fade-in zoom-in duration-300 h-full">
                                    <AdCard
                                        option={option}
                                        isSelected={selectedAd === option.id}
                                        onSelect={onSelect} // Uses prop function
                                        className="shadow-xl"
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Carousel Controls */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                            aria-label="Previous Ad Type"
                        >
                            <ChevronLeft size={24}/>
                        </button>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                            aria-label="Next Ad Type"
                        >
                            <ChevronRight size={24}/>
                        </button>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center mt-6 gap-2">
                        {AD_OPTIONS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentMobileIndex(idx)}
                                className={`
                                    h-2 rounded-full transition-all duration-300
                                    ${idx === currentMobileIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-300'}
                                `}
                            />
                        ))}
                    </div>

                    <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                        <MousePointerClick size={12}/>
                        Tap card to select
                    </p>
                </div>

                {/* Footer / Continue Section */}
                <div
                    className="mt-12 bg-white rounded-xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <CheckCircle2 className="text-indigo-600 w-5 h-5"/>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Selected Format</p>
                            <p className="text-lg font-bold text-slate-900 capitalize">
                                {AD_OPTIONS.find(o => o.id === selectedAd)?.title}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onNext} // Trigger the Hook's nextStep function
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md shadow-indigo-200">
                        Continue to Configuration
                    </button>
                </div>
            </div>
        </div>
    );
}