'use client';

import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {ChevronLeft, Lock} from 'lucide-react';
import {calculateAdCost, createAdRequest} from '@/utils/pricing-utils';
import {ActionButton} from '@/components/ui/action-button';
import {AdFormatDto, AdFormatType} from '@/data/adFormats';
import {CampaignDetails} from '@/hooks/use-campaign-creator';
import {PaymentMethodSelector} from './payment-method-selector';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface StripePaymentProps {
    details: CampaignDetails;
    selectedFormat: AdFormatDto;
    adFormats: AdFormatDto[];
    onBack: () => void;
}

const PaymentCard = ({details, selectedFormat, adFormats, onBack}: StripePaymentProps) => {
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = React.useState<string | undefined>();

    const {totalCost} = calculateAdCost(selectedFormat, details.text.length, details.views, adFormats);

    const handleSubmit = async () => {
        if (!selectedPaymentMethodId) {
            return;
        }


        console.log('[PaymentMethod]', selectedPaymentMethodId);

        const imageUrl = selectedFormat.type === AdFormatType.PHOTO ? (details.mediaUrl || undefined) : undefined;
        const videoUrl = selectedFormat.type === AdFormatType.VIDEO ? (details.mediaUrl || undefined) : undefined;

        createAdRequest({
            adType: selectedFormat.type,
            text: details.text,
            imageUrl,
            videoUrl,
            stripeId: selectedPaymentMethodId,
            viewsBought: details.views,
            calculatedPrice: totalCost,
            stripeAid: "TBD_STRIPE_ACCOUNT_ID"
        });

        alert(`Payment successful with method ID: ${selectedPaymentMethodId}`);
        // Here you would typically make a call to your backend to process the payment
        // using the selectedPaymentMethodId
    };

    return (
        <Card className="w-full max-w-md mx-auto border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-200">
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select a saved card or add a new one to complete purchase.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* Order Summary */}
                <div className="bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-100">
                    <h3 className="font-semibold text-sm text-slate-900">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Campaign</span>
                            <span className="font-medium text-slate-900">{details.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Type</span>
                            <span className="font-medium text-slate-900 capitalize">{selectedFormat.title}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Target Views</span>
                            <span className="font-medium text-slate-900">{details.views.toLocaleString()}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                            <span className="font-bold text-slate-900">Total</span>
                            <span className="font-bold text-lg text-blue-600">${totalCost.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-4">
                    <PaymentMethodSelector
                        selectedPaymentMethodId={selectedPaymentMethodId}
                        onSelect={setSelectedPaymentMethodId}
                    />

                    <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                        <Lock className="w-3 h-3"/>
                        <span>Payments processed securely by</span>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                            alt="Stripe" className="h-5 opacity-80 grayscale hover:grayscale-0 transition-all"/>
                    </div>
                </div>
            </CardContent>
            <CardFooter
                className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                >
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back
                </Button>
                <ActionButton
                    disabled={!selectedPaymentMethodId}
                    type="submit"
                    icon={Lock}
                    onClick={handleSubmit}
                >
                    Pay ${totalCost.toFixed(2)}
                </ActionButton>
            </CardFooter>
        </Card>
    );
};

export default function StripePayment(props: StripePaymentProps) {
    return (
        <Elements stripe={stripePromise}>
            <PaymentCard {...props} />
        </Elements>
    );
}
