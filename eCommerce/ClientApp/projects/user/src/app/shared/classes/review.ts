
export interface Review {
    id?: number;
    productId?: number;
    productStars?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    about?: string;
    sendToSupport?: boolean;
    createdOn?:Date; 
}