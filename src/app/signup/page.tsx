"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/auth?view=register");
    }, [router]);

    return null;
}
