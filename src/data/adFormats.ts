export enum AdFormatType {
    TEXT = "TEXT",
    PHOTO = "PHOTO",
    VIDEO = "VIDEO"
}

export interface TextPricingTierRule {
    maxCharacters: number;
    pricePerMille: number;
}

export interface AdFormatDto {
    id: number;
    type: AdFormatType;
    title: string;
    description: string;
    pricePerMille: number;
    recommended: boolean;
    features: string[];
    pricingTiers: TextPricingTierRule[];
}

export const AD_FORMAT_MOCK_DATA: AdFormatDto[] = [
    {
        id: 1,
        type: AdFormatType.TEXT,
        title: "Text Advertisement",
        description: "Simple text-based advertisement",
        pricePerMille: 0.0, // Base price is 0, depends on tiers
        recommended: false,
        features: [
            "Text-only"
        ],
        pricingTiers: [
            {
                "maxCharacters": 125,
                "pricePerMille": 10.0
            },
            {
                "maxCharacters": 250,
                "pricePerMille": 15.0
            },
            {
                "maxCharacters": 500,
                "pricePerMille": 20.0
            }
        ]
    },
    {
        id: 2,
        type: AdFormatType.PHOTO,
        title: "Display / Photo Ad",
        description: "High-visibility visual format",
        pricePerMille: 30.0,
        recommended: false,
        features: [
            "PNG/JPG support",
            "Combine with Text"
        ],
        pricingTiers: []
    },
    {
        id: 3,
        type: AdFormatType.VIDEO,
        title: "Video Ad",
        description: "Engaging video content",
        pricePerMille: 30.0,
        recommended: true,
        features: [
            "MP4 support",
            "High conversion rate"
        ],
        pricingTiers: []
    }
];
