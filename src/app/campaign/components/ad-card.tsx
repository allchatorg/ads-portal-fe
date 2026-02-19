import {CheckCircle2, Eye, FileText, Image as ImageIcon, Play} from "lucide-react";
import {AdFormatDto, AdFormatType} from "@/data/adFormats";

interface AdCardProps {
    format: AdFormatDto;
    isSelected: boolean;
    onSelect: (format: AdFormatDto) => void;
    className?: string;
}

export const AdCard: React.FC<AdCardProps> = ({format, isSelected, onSelect, className = ""}) => {
    const getIcon = () => {
        switch (format.type) {
            case AdFormatType.TEXT:
                return FileText;
            case AdFormatType.PHOTO:
                return ImageIcon;
            case AdFormatType.VIDEO:
                return Play;
            default:
                return FileText;
        }
    };

    const Icon = getIcon();

    const getPriceDisplay = () => {
        if (format.pricingTiers && format.pricingTiers.length > 0) {
            const minPrice = Math.min(...format.pricingTiers.map((t) => t.pricePerMille));
            return `From $${minPrice.toFixed(2)}`;
        }
        return `From $${format.pricePerMille.toFixed(2)}`;
    };

    return (
        <div
            onClick={() => onSelect(format)}
            className={`
                relative group flex flex-col h-full p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none
                ${
                isSelected
                    ? "border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-100"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
            }
                ${className}
            `}
        >
            <div
                className={`
                    absolute top-4 right-4 transition-all duration-300
                    ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                `}
            >
                <CheckCircle2 className="w-6 h-6 text-indigo-600 fill-indigo-100"/>
            </div>

            <div className="mb-4">
                <div
                    className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200
                        ${
                        isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }
                    `}
                >
                    <Icon className="w-6 h-6"/>
                </div>
            </div>

            <div className="flex-grow">
                <h3
                    className={`text-lg font-bold mb-2 ${
                        isSelected ? "text-indigo-950" : "text-slate-900"
                    }`}
                >
                    {format.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {format.description}
                </p>

                <ul className="space-y-2 mb-6">
                    {format.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs text-slate-500">
                            <div
                                className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                    isSelected ? "bg-indigo-400" : "bg-slate-300"
                                }`}
                            />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
                <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                        CPM Pricing
                    </span>
                    <div className="flex items-baseline gap-1">
                        <span
                            className={`text-2xl font-bold ${
                                isSelected ? "text-indigo-700" : "text-slate-900"
                            }`}
                        >
                            {getPriceDisplay()}
                        </span>
                        <span className="text-xs text-slate-400">/ 1k views</span>
                    </div>
                </div>
                <div className="text-slate-300">
                    <Eye className="w-5 h-5"/>
                </div>
            </div>
        </div>
    );
};
