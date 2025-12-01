"use client";
import {useForm} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import {useRouter} from "next/navigation";

enum AuthView {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
}

interface LoginRequest {
    email: string;
    password: string;
}

export function LoginForm({
                              className,
                              onAuthViewChange,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div"> & {
    onAuthViewChange?: (view: AuthView) => void;
}) {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginRequest>();

    const onSubmit = async (data: LoginRequest) => {
        setError("");
        setIsLoading(true);

        try {
            // TODO: Implement actual login logic here
            console.log("Login data:", data);

            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // On success, redirect to dashboard or ads page
            router.push("/ads");
        } catch (err) {
            setError("Login failed. Please check your credentials and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.MouseEvent) => {
        e.preventDefault();
        setError("");
        // TODO: Implement forgot password logic
        alert("Forgot password functionality - to be implemented");
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Access your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    onClick={handleForgotPassword}
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {error && (
                            <p className="text-center text-sm text-red-500">{error}</p>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a
                            href="#"
                            className="underline underline-offset-4"
                            onClick={(e) => {
                                e.preventDefault();
                                onAuthViewChange?.(AuthView.REGISTER);
                            }}
                        >
                            Sign up
                        </a>
                    </div>
                </form>
            </CardContent>
        </div>
    );
}
