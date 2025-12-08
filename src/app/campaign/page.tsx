'use client';
import {SiteHeader} from "@/components/site-header"
import AdCampaignSelector from "@/app/campaign/components/ad-campaign-selector";
import {ClickableStepper} from "@/components/clickable-stepper";
import {useCampaignCreator} from "@/hooks/use-campaign-creator";
import CampaignConfiguration from "@/app/campaign/components/campaign-configuration";
import StripePayment from "@/app/campaign/components/stripe-payment";

export default function Page() {
    const {
        currentStep,
        goToStep,
        nextStep,
        selectedAdFormat,
        setSelectedAdFormat,
        details,
        setDetails,
        errors,
        adFormats,
        prevStep
    } = useCampaignCreator();

    const STEPS = ['Select Type', 'Configure', 'Payment'];

    return (
        <div className="w-full">
            <SiteHeader
                title="Ad Campaign"
                description="Choose your campaign type and start advertising on allchat"
            />

            <div className="w-full flex flex-col items-center mx-auto max-w-5xl space-y-8 p-6 md:p-12 ">

                {/* Pass hook logic to Stepper */}
                <ClickableStepper
                    steps={STEPS}
                    currentStep={currentStep}
                    onStepChange={() => {
                    }}
                />

                {/* Step 0: Ad Type Selection */}
                <div className="mt-6 w-full">
                    {currentStep === 0 && (
                        <AdCampaignSelector
                            adFormats={adFormats}
                            selectedFormat={selectedAdFormat}
                            onSelect={setSelectedAdFormat}
                            onNext={nextStep}
                        />
                    )}

                    {/* Step 1: Configuration */}
                    {currentStep === 1 && (
                        <CampaignConfiguration
                            selectedFormat={selectedAdFormat}
                            details={details}
                            setDetails={setDetails}
                            errors={errors}
                            onNext={nextStep}
                            onBack={prevStep}
                        />
                    )}

                    {currentStep === 2 && (
                        <div className="w-full max-w-md mx-auto">
                            <StripePayment
                                details={details}
                                selectedFormat={selectedAdFormat}
                                onBack={prevStep}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}