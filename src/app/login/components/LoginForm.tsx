"use client";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {AlertTriangle, CheckCircle2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useForgotPasswordMutation, useLoginMutation} from "@/store/services/userApi";
import {useAppDispatch} from "@/store/hooks";
import {setUser} from "@/store/slices/authSlice";

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
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [login, {isLoading, error: apiError}] = useLoginMutation();
    const [forgotPassword, {isLoading: isForgotPasswordLoading}] = useForgotPasswordMutation();
    const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
    const [forgotPasswordError, setForgotPasswordError] = useState("");

    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors},
    } = useForm<LoginRequest>();

    const onSubmit = async (data: LoginRequest) => {
        try {
            const response = await login(data).unwrap();

            // Store user in Redux state
            dispatch(setUser({
                user: {
                    id: response.id,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                    role: response.role,
                },
                token: response.accessToken,
            }));

            // Login successful
            console.log("Login successful:", response.message);

            // Redirect to ads page
            router.push("/ads");
        } catch (err: any) {
            // Error is handled by RTK Query and displayed below
            console.error("Login failed:", err);
        }
    };

    const handleForgotPassword = async (e: React.MouseEvent) => {
        e.preventDefault();
        setForgotPasswordError("");
        setForgotPasswordSuccess(false);

        try {
            const email = getValues("email");
            if (!email) {
                setForgotPasswordError("Please enter your email address first.");
                return;
            }

            await forgotPassword({email}).unwrap();
            setForgotPasswordSuccess(true);
        } catch (err: any) {
            console.error("Forgot password failed:", err);
            setForgotPasswordError(
                err?.data?.message || "Failed to send reset email. Please check your email address."
            );
        }
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

                        {forgotPasswordSuccess && (
                            <Alert className="border-green-200 bg-green-50">
                                <CheckCircle2 className="h-4 w-4 text-green-600"/>
                                <AlertDescription className="m-0 p-0 text-green-800">
                                    Password reset instructions have been sent to your email address.
                                </AlertDescription>
                            </Alert>
                        )}

                        {forgotPasswordError && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4"/>
                                <AlertDescription className="m-0 p-0">
                                    {forgotPasswordError}
                                </AlertDescription>
                            </Alert>
                        )}

                        {apiError && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4"/>
                                <AlertDescription className="m-0 p-0">
                                    {"data" in apiError && typeof apiError.data === "object" && apiError.data && "message" in apiError.data
                                        ? String(apiError.data.message)
                                        : "Login failed. Please check your credentials and try again."}
                                </AlertDescription>
                            </Alert>
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
