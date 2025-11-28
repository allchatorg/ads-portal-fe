export interface User {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin";
    totalPurchasedAds: number;
    totalSpent: number;
    createdAt: string;
}
