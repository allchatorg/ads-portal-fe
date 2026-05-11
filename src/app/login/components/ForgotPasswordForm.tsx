"use client";

import {useState} from "react";
import {KeyRound} from "lucide-react";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {EmailResetStep} from "@/app/login/components/forgot-password/EmailResetStep";
import {ForgotPasswordMethodPicker} from "@/app/login/components/forgot-password/ForgotPasswordMethodPicker";
import {PhoneResetStep} from "@/app/login/components/forgot-password/PhoneResetStep";
import {methodConfigs, RecoveryMethod} from "@/app/login/components/forgot-password/types";
import {AuthView} from "@/app/login/components/auth-view";

export function ForgotPasswordForm({
                                       className,
                                       onAuthViewChange,
                                       ...props
                                   }: React.ComponentPropsWithoutRef<"div"> & {
    onAuthViewChange?: (view: AuthView) => void;
}) {
    const [selectedMethod, setSelectedMethod] = useState<RecoveryMethod | null>(null);
    const selectedConfig = selectedMethod ? methodConfigs[selectedMethod] : null;

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <CardHeader>
                <div className="flex items-start gap-3">
                    <div
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <KeyRound className="h-5 w-5"/>
                    </div>
                    <div className="min-w-0">
                        <CardTitle className="text-2xl">
                            {selectedConfig ? selectedConfig.label : "Reset password"}
                        </CardTitle>
                        <CardDescription className="mt-1">
                            {selectedConfig
                                ? "Enter the account detail you want to use."
                                : "Choose how you want to find your account."}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {!selectedMethod && (
                    <ForgotPasswordMethodPicker
                        onMethodSelect={setSelectedMethod}
                        onBackToLogin={() => onAuthViewChange?.(AuthView.LOGIN)}
                    />
                )}

                {selectedMethod === "email" && (
                    <EmailResetStep
                        onBackToMethods={() => setSelectedMethod(null)}
                        onBackToLogin={() => onAuthViewChange?.(AuthView.LOGIN)}
                    />
                )}

                {selectedMethod === "phone" && (
                    <PhoneResetStep
                        onBackToMethods={() => setSelectedMethod(null)}
                        onBackToLogin={() => onAuthViewChange?.(AuthView.LOGIN)}
                    />
                )}
            </CardContent>
        </div>
    );
}
