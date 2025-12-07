"use client";

import {AdminRoute} from "@/components/route-guards";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <AdminRoute>
            {children}
        </AdminRoute>
    );
}
