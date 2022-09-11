// Products
export interface Product {
    id?: number;
    title?: string;
    description?: string;
    type?: string;
    brand?: string;
    collection?: any[];
    category?: string;
    price?: number;
    sale?: boolean;
    discount?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    tags?: any[];
    variants?: Variants[];
    images?: Images[];
}
export interface Products {
    id?: number;
    title?: string;
    description?: string;
    details?: string;
    videoUrl?: string;
    quantity?: number;
    price?: number;
    category?: number;
    discountRate?: number;
    userId?: string;
    isShippable?: boolean;
    pickupInStore?: boolean;
    isReturnRequestAllowed?: boolean;
    rating?: number;
    views?: number;
    ratingVotes?: number;
    votedUsers?: number;
    premiumPackage?: number;
    approveType?: number;
    itemType?: number;
    status?: number;
    gender?: number;
    createdOn?: Date;
    expiredOn?: Date;

    variant?: Variants[];
    image?: Images[];

    variants?: Variants[];
    images?: Images[];
}
export interface Variants {
    productId?: number;
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
}

export interface Images {
    productId?: number;
    image_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: number;
}
export interface ProductIds {
    quantity?: number;
    id?: number;
}

export interface ProductListing {
    products: Products[];
    variant: Variants[];
    image?: Images[];
}