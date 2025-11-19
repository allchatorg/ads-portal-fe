'use client';
import {SiteHeader} from "@/components/site-header"
import AdCampaignSelector from "@/app/campaign/components/ad-campaign-selector";
import {ClickableStepper} from "@/components/clickable-stepper";
import {useCampaignCreator} from "@/hooks/use-campaign-creator";

export default function Page() {
    const {
        currentStep,
        goToStep,
        nextStep,
        adType,
        setAdType
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
                    onStepChange={goToStep}
                />

                {/* Step 0: Ad Type Selection */}
                <div className="mt-6 w-full">
                    {currentStep === 0 && (
                        <AdCampaignSelector
                            selectedAd={adType}
                            onSelect={setAdType}
                            onNext={nextStep}
                        />
                    )}

                    {/* Example placeholders for future steps */}
                    {currentStep === 1 && (
                        <div className="text-center p-12 border border-dashed border-slate-300 rounded-xl">
                            <h2 className="text-xl font-bold text-slate-700">Configuration for {adType}</h2>
                            <p className="text-slate-500">Form inputs go here...</p>
                            <button onClick={nextStep} className="mt-4 bg-slate-900 text-white px-4 py-2 rounded">Next
                            </button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="text-center p-12 border border-dashed border-slate-300 rounded-xl">
                            <h2 className="text-xl font-bold text-slate-700">Payment</h2>
                            <p className="text-slate-500">Stripe integration goes here...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}