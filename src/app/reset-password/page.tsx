"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useResetPasswordMutation } from "@/store/services/userApi";

interface ResetPasswordForm {
    password: string;
    confirmPassword: string;
}

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token") ?? "";

    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "">("");

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordForm>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password");
    const isBusy = isLoading || isSubmitting;

    const onSubmit = async (data: ResetPasswordForm) => {
        if (!token) {
            setMessage("Invalid or missing reset token");
            setMessageType("error");
            return;
        }

        setMessage("");

        try {
            await resetPassword({
                token,
                newPassword: data.password,
            }).unwrap();

            setMessage("Password reset successfully! Redirecting to login...");
            setMessageType("success");
            reset();

            setTimeout(() => {
                router.push("/auth?view=login");
            }, 1500);
        } catch (err) {
            console.error("Password reset failed:", err);
            setMessage(getResetPasswordError(err));
            setMessageType("error");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
            <div className="flex w-full max-w-[450px] flex-col items-center gap-8">
                <Card className="w-full overflow-hidden pt-6">
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src="/allchat-logo.png"
                            alt="AllChat Ads Portal"
                            width={142}
                            height={48}
                            priority
                            className="h-12 w-auto"
                        />
                        <p className="text-sm text-muted-foreground">
                            The place for all your advertising needs.
                        </p>
                    </div>

                    <CardHeader>
                        <CardTitle className="text-2xl">Reset password</CardTitle>
                        <CardDescription>
                            Choose a new password for your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="password">New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your new password"
                                            autoComplete="new-password"
                                            className="pr-10"
                                            disabled={isBusy}
                                            {...register("password", {
                                                required: "Password is required",
                                                pattern: {
                                                    value: /^[^\s\x00-\x1F\x7F]{8,128}$/,
                                                    message:
                                                        "Password must be between 8 and 128 characters and contain no whitespace",
                                                },
                                            })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-sm text-red-500">{errors.password.message}</p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your new password"
                                            autoComplete="new-password"
                                            className="pr-10"
                                            disabled={isBusy}
                                            {...register("confirmPassword", {
                                                required: "Please confirm your password",
                                                validate: (value) => value === password || "Passwords do not match",
                                            })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            aria-label={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"}
                                            className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                                    )}
                                </div>

                                {message && (
                                    <Alert
                                        className={messageType === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
                                    >
                                        <AlertDescription
                                            className={messageType === "success" ? "text-green-800" : "text-red-800"}
                                        >
                                            {message}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isBusy || !token}
                                >
                                    {isBusy ? "Resetting..." : "Reset Password"}
                                </Button>

                                {!token && (
                                    <Alert className="border-yellow-200 bg-yellow-50">
                                        <AlertDescription className="text-yellow-800">
                                            No reset token found. Please use the link from your email or verify your
                                            phone reset code.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="mt-4 text-center text-sm">
                                Remembered your password?{" "}
                                <button
                                    type="button"
                                    className="underline underline-offset-4"
                                    onClick={() => router.push("/auth?view=login")}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function ResetPasswordFallback() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
            <div className="flex w-full max-w-[450px] flex-col items-center gap-8">
                <Card className="w-full overflow-hidden pt-6">
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src="/allchat-logo.png"
                            alt="AllChat Ads Portal"
                            width={142}
                            height={48}
                            priority
                            className="h-12 w-auto"
                        />
                        <p className="text-sm text-muted-foreground">
                            The place for all your advertising needs.
                        </p>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl">Loading...</CardTitle>
                        <CardDescription className="text-center">
                            Preparing the password reset form.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<ResetPasswordFallback />}>
            <ResetPasswordContent />
        </Suspense>
    );
}

function getResetPasswordError(error: unknown) {
    if (typeof error === "string") {
        return error;
    }

    if (isRecord(error)) {
        if ("data" in error) {
            const data = error.data;

            if (typeof data === "string") {
                return data;
            }

            if (isRecord(data)) {
                if (typeof data.message === "string") {
                    return data.message;
                }

                if (typeof data.error === "string") {
                    return data.error;
                }
            }
        }

        if (typeof error.message === "string") {
            return error.message;
        }

        if (typeof error.error === "string") {
            return error.error;
        }
    }

    return "Failed to reset password. Please try again.";
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}
