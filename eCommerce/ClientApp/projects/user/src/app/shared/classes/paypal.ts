
export interface PaypPalInput {
    name?: string;
    currency?: string;
    brandName?: string;
    quantity?: number;
    price?: number;
    orderId?: number;
}

export interface PayPal {
    name: string;
    currency: string;
    brandName: string;
    quantity: number;
    price: number;
    orderId: number;
}