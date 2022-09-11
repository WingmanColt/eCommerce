import { ApproveType } from "../../../../../core-shared/src/lib/classes/enums";
import { CartItem } from "./cart";
import { Order } from "./order";
import { ProductIds, Products } from "./product";

// Order
export interface Checkout {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    adress?: string;
    country?: string;
    town?: string;
    state?: string;
    postalCode: string;
    userId: string;
    isGuest: boolean;
    pickupAtHome: boolean;
    approveType?: ApproveType;
    orders?: Order[];  
    cartItems?: CartItem[];
    products?: Products[];
    productIds?: ProductIds[];
}