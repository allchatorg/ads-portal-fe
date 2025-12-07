"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {AuthRoute} from "@/components/route-guards";

export default function SignupPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/auth?view=register");
    }, [router]);

    return (
        <AuthRoute>
            {null}
        </AuthRoute>
    );
}

