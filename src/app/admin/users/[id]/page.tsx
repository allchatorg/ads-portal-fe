"use client";
import {redirect, useParams} from "next/navigation";

export default function UserIndex() {
    const params = useParams();

    return redirect(`/admin/users/${params.id}/details`);
}
