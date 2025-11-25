import {AdItem} from "./ad-item";

export interface AdStatusDetails extends AdItem {
    paymentCardLast4: string;
    paymentCardBrand: string;
    currentViews?: number;
    servedViews?: number;
    rejectionReason?: string;
}
