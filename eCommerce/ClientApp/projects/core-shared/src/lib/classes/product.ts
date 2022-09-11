// Products
export interface Product {
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
    approveType?: ApproveType;
    itemType?: ItemType;
    status?: Status
    gender?: Gender;
    createdOn?: Date;
    expiredOn?: Date;

    variants?: Variants[];
    images?: Images[];
}
export interface Variants {
    product_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
}

export interface Images {
    product_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: any[];
}

export enum ApproveType {
    Waiting = 0,
    Rejected = 1,
    Success = 2
}
export enum Status {
    Available = 0,
    Sold = 1,
    Unavailable = 2,
    Archived = 3
}
export enum ItemType {
    Physical = 0,
    Digital = 1,
    Bundle = 2
}
export enum Gender {
    None = 0,
    Unisex = 1,
    Men = 2,
    Women = 3,
    Kids = 4
}
export const Gender_LabelMapping: Record<Gender, string> = {
    [Gender.None]: "None",
    [Gender.Unisex]: "Unisex",
    [Gender.Men]: "Mens",
    [Gender.Women]: "Womens",
    [Gender.Kids]: "Kids",
};
export const ItemType_LabelMapping: Record<ItemType, string> = {
    [ItemType.Physical]: "Physical item",
    [ItemType.Digital]: "Digital item",
    [ItemType.Bundle]: "Bundle package",
};