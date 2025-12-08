"use client"

import Image from "next/image"
import Link from "next/link"
import {ArrowRight, BarChart3, FileText, Image as ImageIcon, MessageSquare, Users, Video} from "lucide-react"
import {motion, Variants} from "framer-motion"
import {AD_FORMAT_MOCK_DATA, AdFormatType} from "@/data/adFormats";

const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

// Add ": Variants" here
const itemVariants: Variants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut" // TypeScript now knows this is a valid Easing type
        }
    },
}

export default function Home() {
    return (
        // MAIN BACKGROUND COLOR set to your brand color
        <div className="min-h-screen w-full bg-[#E0EEFF] overflow-hidden relative selection:bg-blue-200">

            {/* Ambient Background Elements - Subtle movement to give "life" */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* A soft white glow from the top to simulate lighting */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/60 to-transparent blur-3xl"/>

                {/* A floating blob for depth */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
                    className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1}}
                    className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[80px]"
                />
            </div>

            <main className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-24">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center"
                >
                    {/* Logo */}
                    <motion.div variants={itemVariants} className="mb-8 relative sm:mb-12">
                        <Image
                            src="/allchat-logo.png"
                            alt="AllChat Ads Portal"
                            width={640}
                            height={220}
                            priority
                            // Added a slight drop shadow to make the logo pop off the blue bg
                            className="h-auto w-[200px] sm:w-[380px] md:w-[480px] drop-shadow-xl"
                        />
                    </motion.div>

                    {/* Hero Text */}
                    <motion.div variants={itemVariants} className="text-center max-w-4xl">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                            Grow your business on <br className="hidden sm:block"/>
                            <span className="text-blue-600">AllChat</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-700 sm:text-xl leading-relaxed max-w-2xl mx-auto">
                            Launch high-conversion campaigns in minutes. Reach users directly in their conversations
                            with
                            <strong> Text</strong>, <strong>Image</strong>, and <strong>Video</strong> ads.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={itemVariants}
                                className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                        <Link href="/auth?view=register" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                className="w-full inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
                            >
                                Create Ad Account
                                <ArrowRight className="ml-2 h-4 w-4"/>
                            </motion.button>
                        </Link>

                        <Link href="/auth?view=login" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.8)"}}
                                whileTap={{scale: 0.98}}
                                className="w-full inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/50 backdrop-blur-sm px-8 py-4 text-base font-bold text-slate-900 shadow-sm transition-colors hover:bg-white/80"
                            >
                                Log in
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Ad Format Cards */}
                    <motion.div variants={itemVariants} className="mt-24 w-full">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold text-slate-900">Choose your format</h2>
                        </div>

                        <div className="grid w-full gap-6 sm:grid-cols-3">
                            {AD_FORMAT_MOCK_DATA.map((format) => {
                                let Icon = FileText;
                                switch (format.type) {
                                    case AdFormatType.TEXT:
                                        Icon = MessageSquare;
                                        break;
                                    case AdFormatType.PHOTO:
                                        Icon = ImageIcon;
                                        break;
                                    case AdFormatType.VIDEO:
                                        Icon = Video;
                                        break;
                                }

                                return (
                                    <Link key={format.id} href={`/campaign?formatId=${format.id}`}
                                          className="block h-full">
                                        <motion.div
                                            variants={itemVariants}
                                            whileHover={{y: -5, transition: {duration: 0.2}}}
                                            className="group relative h-full rounded-2xl bg-white/80 backdrop-blur-md p-8 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all border border-white/50 flex flex-col items-start"
                                        >
                                            <div
                                                className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#E0EEFF] p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                <Icon className="h-6 w-6"/>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{format.title}</h3>
                                            <p className="text-slate-600 leading-relaxed max-w-sm">{format.description}</p>
                                        </motion.div>
                                    </Link>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Trust Section / Footer Teaser */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-20 flex flex-wrap justify-center gap-8 text-center text-slate-600 opacity-80"
                    >
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5"/>
                            <span className="font-medium">Reaching thousands of daily users</span>
                        </div>
                        <div className="w-px h-6 bg-slate-300 hidden sm:block"></div>
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5"/>
                            <span className="font-medium">Real-time performance tracking</span>
                        </div>
                    </motion.div>

                </motion.div>
            </main>
        </div>
    )
}