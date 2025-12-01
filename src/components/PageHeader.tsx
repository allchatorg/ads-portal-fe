import {Card} from "@/components/ui/card";
import React from "react";
import {LucideIcon} from "lucide-react";
import {User} from "@/models/user";

interface PageHeaderProps {
    title: string;
    description: string;
    icon: LucideIcon;
    user?: User;
}

export function PageHeader({title, description, icon: Icon, user}: PageHeaderProps) {
    return (
        <Card className="bg-white p-6">
            <div className="space-y-3">
                <h1 className="flex items-center gap-3 text-2xl font-bold">
                    <Icon className="h-8 w-8 text-blue-600"/>
                    {title}
                </h1>
                <p className="text-lg leading-relaxed text-slate-600">
                    {description}{" "}
                    {user && <span className="font-semibold">
                        {user.name} (ID: {user.id})
                    </span>}
                </p>
            </div>
        </Card>
    );
}
