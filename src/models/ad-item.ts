export type AdApprovalState = "rejected" | "pending" | "running" | "completed"

export interface AdItem {
    id: number
    title: string
    adType: "text" | "photo" | "video"
    viewsBought: number
    price: number
    totalPricePaid: number
    purchaseDate: string
    startDate: string
    approvalState: AdApprovalState
}

export type AdType = "text" | "photo" | "video"