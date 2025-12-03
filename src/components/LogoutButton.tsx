"use client";
import { useLogoutMutation } from "@/store/services/userApi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { clearUser } from "@/store/slices/authSlice";

interface LogoutButtonProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    className?: string;
}

export function LogoutButton({ variant = "outline", className }: LogoutButtonProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [logout, { isLoading }] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();

            // Clear user from Redux state
            dispatch(clearUser());

            // Session cookie is automatically cleared by the backend
            console.log("Logout successful");

            // Redirect to login page
            router.push("/login");
        } catch (err) {
            console.error("Logout failed:", err);
            // Even if logout fails, clear state and redirect for security
            dispatch(clearUser());
            router.push("/login");
        }
    };

    return (
        <Button
            variant={variant}
            onClick={handleLogout}
            disabled={isLoading}
            className={className}
        >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoading ? "Logging out..." : "Logout"}
        </Button>
    );
}
