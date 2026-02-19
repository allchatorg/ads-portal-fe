"use client"

import Image from "next/image"
import Link from "next/link"
import {
    ArrowRight,
    BarChart3,
    FileText,
    Image as ImageIcon,
    MessageSquare,
    Users,
    Video,
} from "lucide-react"

export default function Home() {
    const adFormats = [
        {
            id: 1,
            type: "TEXT",
            title: "Text Advertisement",
            description: "Simple text-based advertisement",
        },
        {
            id: 2,
            type: "PHOTO",
            title: "Display / Photo Ad",
            description: "High-visibility visual format",
        },
        {
            id: 3,
            type: "VIDEO",
            title: "Video Ad",
            description: "Engaging video content",
        },
    ]

    return (
        <div className="min-h-screen w-full bg-[#E0EEFF] overflow-hidden relative selection:bg-blue-200">
            <main className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-24">
                <div className="flex flex-col items-center">
                    <div className="mb-8 sm:mb-12">
                        <Image
                            src="/allchat-logo.png"
                            alt="AllChat Ads Portal"
                            width={640}
                            height={220}
                            priority
                            className="h-auto w-[200px] sm:w-[380px] md:w-[480px] drop-shadow-lg"
                        />
                    </div>

                    <div className="text-center max-w-4xl">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                            Grow your business on <br className="hidden sm:block" />
                            <span className="text-blue-600">allchat</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-700 sm:text-xl leading-relaxed max-w-2xl mx-auto">
                            Launch high-conversion campaigns in minutes. Reach users directly in their conversations
                            with <strong>Text</strong>, <strong>Image</strong>, and <strong>Video</strong> ads.
                        </p>
                    </div>

                    <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                        <Link href="/auth?view=register" className="w-full sm:w-auto">
                            <button className="w-full inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-blue-700 active:scale-95">
                                Create Ad Account
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </Link>

                        <Link href="/auth?view=login" className="w-full sm:w-auto">
                            <button className="w-full inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/50 backdrop-blur-sm px-8 py-4 text-base font-bold text-slate-900 shadow-sm transition-all duration-200 hover:bg-white/80 active:scale-95">
                                Log in
                            </button>
                        </Link>
                    </div>

                    <div className="mt-24 w-full">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold text-slate-900">Choose your format</h2>
                        </div>

                        <div className="grid w-full gap-6 sm:grid-cols-3">
                            {adFormats.map((format) => {
                                let Icon = FileText
                                switch (format.type) {
                                    case "TEXT":
                                        Icon = MessageSquare
                                        break
                                    case "PHOTO":
                                        Icon = ImageIcon
                                        break
                                    case "VIDEO":
                                        Icon = Video
                                        break
                                }

                                return (
                                    <Link
                                        key={format.id}
                                        href={`/campaign?formatId=${format.id}`}
                                        className="block h-full"
                                    >
                                        <div className="group relative h-full rounded-3xl bg-white p-6 shadow-lg border border-gray-200 flex flex-col items-start transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl">
                                            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-blue-100 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                                {format.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {format.description}
                                            </p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center gap-8 text-center text-slate-600 opacity-80">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            <span className="font-medium">Reaching thousands of daily users</span>
                        </div>
                        <div className="w-px h-6 bg-slate-300 hidden sm:block"></div>
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            <span className="font-medium">Real-time performance tracking</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
