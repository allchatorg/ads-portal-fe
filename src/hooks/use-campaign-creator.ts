import {useState} from "react";
import {AdType} from "@/models/adType";

export function useCampaignCreator() {
    // 1. Stepper State
    const [currentStep, setCurrentStep] = useState(0);

    // 2. Data State
    const [adType, setAdType] = useState<AdType>('photo');
    const [selectedDetails, setSelectedDetails] = useState<any>({});

    // --- Logic Actions ---

    const goToStep = (step: number) => {
        setCurrentStep(step);
    };

    const nextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
    };

    // Select Ad Type logic (Modified)
    const selectAdType = (type: AdType) => {
        // Only perform updates if the type is actually different
        // This prevents accidental data wiping if they click the same card twice
        if (type !== adType) {
            setAdType(type);
            setSelectedDetails({}); // Reset form data on type change
        }
    };

    return {
        // State
        currentStep,
        adType,
        selectedDetails,

        // Actions
        goToStep,
        nextStep,
        prevStep,
        setAdType: selectAdType,
        setSelectedDetails
    };
}