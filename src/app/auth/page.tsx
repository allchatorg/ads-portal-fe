"use client";

import React, {useEffect, useState} from "react";
import {LoginForm} from "@/app/login/components/LoginForm";
import {RegisterForm} from "@/app/login/components/RegisterForm";
import {AnimatePresence, motion} from "framer-motion";
import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import {Card} from "@/components/ui/card";

enum AuthView {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
}

const AuthPage: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [view, setView] = useState<AuthView>(AuthView.LOGIN);

    useEffect(() => {
        const viewParam = searchParams.get("view");

        if (viewParam === "login") {
            setView(AuthView.LOGIN);
        } else if (viewParam === "register") {
            setView(AuthView.REGISTER);
        }
    }, [searchParams]);

    const handleAuthViewChange = (newView: AuthView) => {
        const viewMap = {
            [AuthView.LOGIN]: "login",
            [AuthView.REGISTER]: "register",
        } as const;

        router.push(`?view=${viewMap[newView]}`);
    };

    return (
        <div className="flex h-full min-h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-8 min-w-[450px] max-w-[450px]">
                <Card className="pt-6 w-full">
                    <motion.div
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="flex flex-col items-center gap-2"
                    >
                        <Image
                            src="/allchat-logo.png"
                            width={142}
                            height={48}
                            alt="Logo"
                            priority
                        />
                        <p className="text-sm text-muted-foreground">
                            The place for all your advertising needs.
                        </p>
                    </motion.div>
                    <AnimatePresence mode="wait">
                        {view === AuthView.LOGIN && (
                            <motion.div
                                key="login"
                                className="w-full"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.3}}
                            >
                                <LoginForm onAuthViewChange={handleAuthViewChange}/>
                            </motion.div>
                        )}
                        {view === AuthView.REGISTER && (
                            <motion.div
                                key="register"
                                className="w-full"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.3}}
                            >
                                <RegisterForm className="" onAuthViewChange={handleAuthViewChange}/>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>
            </div>
        </div>
    );
};

export default AuthPage;
