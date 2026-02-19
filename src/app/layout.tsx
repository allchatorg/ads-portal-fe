import type { Metadata } from "next";
import "./globals.css";
import { ConditionalLayout } from "@/components/conditional-layout";
import { StoreProvider } from "@/store/StoreProvider";
import localFont from "next/font/local";
import { DialogProvider } from "@/components/providers/DialogProvider";
import { Footer } from "@/components/Footer";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Allchat Ads Portal – For all your advertising needs",
    description:
        "Welcome to the Allchat Ads Portal. Create, manage, and optimize campaigns to reach the right audience and grow your presence across Allchat.",
    icons: {
        icon: [
            { url: "/icon.png", type: "image/png", sizes: "16x16" },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-[#E0EEFF] pb-10`}
            >
                <StoreProvider>
                    <DialogProvider>
                        <ConditionalLayout>
                            {children}
                        </ConditionalLayout>
                        <Footer />
                    </DialogProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
