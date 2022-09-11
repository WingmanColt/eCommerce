import { ApproveType, Gender, Images, ItemType, Status, Variants } from "../../../../../../core-shared/src/lib/classes/product";

export interface AddProduct {
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
    premiumPackage?: number;
    approveType?: ApproveType;
    itemType?: ItemType;
    status?: Status;
    gender?: Gender;
    createdOn?: Date;
    expiredOn?: Date;

    variant?: Variants[];
    image?: Images[];
}

