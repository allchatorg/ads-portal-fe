"use client";

import React, {Suspense, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useForm} from "react-hook-form";
import {AlertTriangle, CheckCircle2, Eye, EyeOff, KeyRound, Shield} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useResetPasswordMutation} from "@/store/services/userApi";

interface ResetPasswordForm {
    newPassword: string;
}

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [resetPassword, {isLoading, error: apiError, isSuccess}] = useResetPasswordMutation();
    const [localError, setLocalError] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ResetPasswordForm>();

    useEffect(() => {
        if (isSuccess) {
            // Redirect to login after 3 seconds
            const timeout = setTimeout(() => {
                router.push("/auth?view=login");
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [isSuccess, router]);

    const onSubmit = async (data: ResetPasswordForm) => {
        setLocalError("");

        if (!token) {
            setLocalError("Invalid or missing reset token. Please request a new password reset.");
            return;
        }

        try {
            await resetPassword({
                token,
                newPassword: data.newPassword,
            }).unwrap();
        } catch (err: any) {
            console.error("Password reset failed:", err);
        }
    };

    // Success state
    if (isSuccess) {
        return (
            <div className="flex h-screen items-center justify-center p-4 bg-background">
                <div className="w-full max-w-md">
                    <Card className="border-green-100">
                        <CardHeader className="space-y-4">
                            <div
                                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-green-50 bg-gradient-to-br from-green-100 to-green-200 shadow-lg">
                                <CheckCircle2 className="h-10 w-10 text-green-600"/>
                            </div>
                            <CardTitle
                                className="text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent">
                                Password Reset Successful
                            </CardTitle>
                            <CardDescription className="text-center">
                                Your password has been successfully reset. You can now log in with your new password.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-center text-sm text-muted-foreground">
                                Redirecting to login page in 3 seconds...
                            </p>
                            <Button
                                onClick={() => router.push("/auth?view=login")}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                                Go to Login Now
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // Reset password form
    return (
        <div className="flex h-screen items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="space-y-4">
                        <div
                            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-50 bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
                            <KeyRound className="h-10 w-10 text-blue-600"/>
                        </div>
                        <CardTitle
                            className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
                            Reset Your Password
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your new password below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!token && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertTriangle className="h-4 w-4"/>
                                <AlertDescription>
                                    Invalid or missing reset token. Please request a new password reset.
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        className="pr-10"
                                        {...register("newPassword", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters long",
                                            },
                                            maxLength: {
                                                value: 32,
                                                message: "Password must be at most 32 characters long",
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
                                                message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                                            },
                                        })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                                )}
                            </div>

                            {(localError || apiError) && (
                                <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4"/>
                                    <AlertDescription className="m-0 p-0">
                                        {localError ||
                                            (apiError && "data" in apiError && typeof apiError.data === "object" && apiError.data && "message" in apiError.data
                                                ? String(apiError.data.message)
                                                : "Password reset failed. The token may be invalid or expired.")}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                disabled={isLoading || !token}
                            >
                                {isLoading ? "Resetting Password..." : "Reset Password"}
                            </Button>

                            <div className="text-center">
                                <a
                                    href="/auth?view=login"
                                    className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-4"
                                >
                                    Back to Login
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Loading fallback component
function ResetPasswordFallback() {
    return (
        <div className="flex h-screen items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="space-y-4">
                        <div
                            className="mx-auto flex h-20 w-20 animate-pulse items-center justify-center rounded-full border-4 border-blue-50 bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
                            <Shield className="h-10 w-10 text-blue-600"/>
                        </div>
                        <CardTitle
                            className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
                            Loading...
                        </CardTitle>
                        <CardDescription className="text-center">
                            Please wait while we prepare the password reset form.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<ResetPasswordFallback/>}>
            <ResetPasswordContent/>
        </Suspense>
    );
}
