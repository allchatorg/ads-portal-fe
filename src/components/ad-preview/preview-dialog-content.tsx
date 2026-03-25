"use client";

interface PreviewDialogContentProps {
    previewUrl: string;
    title: string;
}

export function PreviewDialogContent({previewUrl, title}: PreviewDialogContentProps) {
    return (
        <div className="flex flex-col bg-white h-full">
            <div className="border-b border-slate-200 px-5 py-2 sm:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Preview type
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{title}</p>
                <p className="mt-1 text-sm text-slate-500">
                    This is how your ad will look on allchat.org.
                </p>
            </div>

            <iframe
                src={previewUrl}
                title={`${title} iframe preview`}
                loading="lazy"
                className="h-full min-h-[520px] w-full bg-white"
            />
        </div>
    );
}
