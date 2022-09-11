import { Products } from "./product";

export interface Cart {
    id?: number;
    expiredOn?: Date;
    totalItems?: number;
    totalCost?: any;
    userId?: string;
    cartItems?: CartItem[];
    products?: Products[];
}

export interface CartItem {
    id?: number;
    productId?: number;
    cartId?: number;
    checkoutId?: number;
}