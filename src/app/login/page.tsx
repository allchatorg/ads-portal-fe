"use client";

import {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {AuthRoute} from "@/components/route-guards";

// Legacy route: redirect /login to /auth preserving the view query if present
export default function LegacyLoginRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const view = searchParams.get("view") || "login";
        router.replace(`/auth?view=${view}`);
    }, [router, searchParams]);

    return (
        <AuthRoute>
            {null}
        </AuthRoute>
    );
}

