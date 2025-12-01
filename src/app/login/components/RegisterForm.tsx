"use client";
import {useForm} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {useState} from "react";
import {AlertTriangle} from "lucide-react";
import {useRouter} from "next/navigation";

enum AuthView {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
}

interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

export function RegisterForm({
                                 className,
                                 onAuthViewChange,
                                 ...props
                             }: React.ComponentPropsWithoutRef<"div"> & {
    onAuthViewChange?: (view: AuthView) => void;
}) {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register: formRegister,
        handleSubmit,
        watch,
        formState: {errors},
        reset,
    } = useForm<RegisterRequest>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password");

    const onSubmit = async (data: RegisterRequest) => {
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            // TODO: Implement actual registration logic here
            console.log("Register data:", data);

            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSuccess("Registration successful! Redirecting...");
            reset();

            // Redirect to login or dashboard after successful registration
            setTimeout(() => {
                router.push("/ads");
            }, 1500);
        } catch (err) {
            setError("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
                <CardDescription>Create a new account.</CardDescription>
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
                                {...formRegister("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                disabled={isLoading}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...formRegister("password", {
                                    required: "Password is required",
                                    minLength: {value: 8, message: "Password must be at least 8 characters"},
                                    pattern: {
                                        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s]).{8,}$/,
                                        message:
                                            "Password must contain at least one digit, uppercase, lowercase, and special character",
                                    },
                                })}
                                disabled={isLoading}
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...formRegister("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4"/>
                                <AlertDescription className="m-0 p-0">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        {success && <p className="text-center text-sm text-green-600">{success}</p>}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Registering..." : "Register"}
                        </Button>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <a
                            href="#"
                            className="underline underline-offset-4"
                            onClick={(e) => {
                                e.preventDefault();
                                onAuthViewChange?.(AuthView.LOGIN);
                            }}
                        >
                            Login
                        </a>
                    </div>
                </form>
            </CardContent>
        </div>
    );
}
