import { Product } from './product';

// Order
export interface Order {
    Id?: number;
    shippingDetails?: any;
    productId?: Product;
    checkoutId?: number;
    quantity?: number;
    totalAmount?: any;
    isPayed?: boolean;
    willEarnRewardPoints?: number; 
    tax?: number;
    createdOn?: Date;
    expiredOn?:Date;
}