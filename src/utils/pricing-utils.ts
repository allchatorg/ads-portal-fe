import {AdFormatDto, AdFormatType} from "@/data/adFormats";

export const MAX_CHAR_COUNT = 500;

export function calculateAdCost(format: AdFormatDto, textLength: number, views: number): {
    totalCost: number;
    baseCPM: number;
    textCPM: number;
    totalCPM: number;
} {
    let baseCPM = format.pricePerMille;
    let textCPM = 0;
    let totalCPM = baseCPM;

    // Custom Logic for Text Tiers
    if (format.type === AdFormatType.TEXT && format.pricingTiers) {
        const charCount = textLength;
        // Sort tiers by maxCharacters asc to find the first one that fits
        const sortedTiers = [...format.pricingTiers].sort((a, b) => a.maxCharacters - b.maxCharacters);
        const matchedTier = sortedTiers.find(tier => charCount <= tier.maxCharacters);

        // If exceeds max tier, use the highest tier (or base? usually highest tier price)
        if (matchedTier) {
            textCPM = matchedTier.pricePerMille;
        } else if (sortedTiers.length > 0) {
            // Exceeds all tiers? Use the last one (highest char count)
            textCPM = sortedTiers[sortedTiers.length - 1].pricePerMille;
        }
        totalCPM = textCPM; // For text ads, CPM is fully determined by tiers in this model (Base is 0)
    }

    const totalCost = (views / 1000) * totalCPM;

    return {
        totalCost,
        baseCPM,
        textCPM,
        totalCPM
    };
}
