"use client";
import {useForm} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {useState} from "react";
import {AlertTriangle, CheckCircle2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useRegisterMutation} from "@/store/services/userApi";
import {useAppDispatch} from "@/store/hooks";
import {setUser} from "@/store/slices/authSlice";

enum AuthView {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
}

interface RegisterFormData {
    firstName: string;
    lastName: string;
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
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [registerUser, {isLoading, error: apiError}] = useRegisterMutation();

    const {
        register: formRegister,
        handleSubmit,
        watch,
        formState: {errors},
        reset,
    } = useForm<RegisterFormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password");

    const onSubmit = async (data: RegisterFormData) => {
        setSuccess(null);

        try {
            // Remove confirmPassword before sending to API
            const {confirmPassword: _, ...registerData} = data;

            const response = await registerUser(registerData).unwrap();

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

            // Registration successful
            console.log("Registration successful:", response.message);
            setSuccess("Registration successful! Redirecting...");
            reset();

            // Redirect to ads page after successful registration
            setTimeout(() => {
                router.push("/ads");
            }, 1500);
        } catch (err) {
            // Error is handled by RTK Query and displayed below
            console.error("Registration failed:", err);
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
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                type="text"
                                placeholder="John"
                                {...formRegister("firstName", {
                                    required: "First name is required",
                                })}
                                disabled={isLoading}
                            />
                            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                type="text"
                                placeholder="Doe"
                                {...formRegister("lastName", {
                                    required: "Last name is required",
                                })}
                                disabled={isLoading}
                            />
                            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                        </div>

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
                                    pattern: {
                                        value: /^[^\s\x00-\x1F\x7F]{8,128}$/,
                                        message:
                                            "Password must be between 8 and 128 characters and contain no whitespace",
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

                        {apiError && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4"/>
                                <AlertDescription className="m-0 p-0">
                                    {"data" in apiError && typeof apiError.data === "object" && apiError.data && "message" in apiError.data
                                        ? String(apiError.data.message)
                                        : "Registration failed. Please try again."}
                                </AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="border-green-500 bg-green-50 text-green-900">
                                <CheckCircle2 className="h-4 w-4 text-green-600"/>
                                <AlertDescription className="m-0 p-0 text-green-900">
                                    {success}
                                </AlertDescription>
                            </Alert>
                        )}

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
