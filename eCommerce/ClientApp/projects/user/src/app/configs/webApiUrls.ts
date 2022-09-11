import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';


@Injectable()

export class WebApiUrls {
    private _config: { [key: string]: string };
    constructor() {
        this._config = {
            GetProducts: environment.baseApiUrl + 'product/listing',
            GetSpecialProduct: environment.baseApiUrl + 'product/getSpecialProduct',
            GetProductDetails: environment.baseApiUrl + 'product/info',
            GetProductsByIds: environment.baseApiUrl + 'product/get-all-by-Ids',
            
            CartAddProduct: environment.baseApiUrl + 'cart/addCartItem',
            GetCart: environment.baseApiUrl + 'cart/get-all-bycart',
            AddCartItem: environment.baseApiUrl + 'cart/add-item',
            GetCartItems: environment.baseApiUrl + 'cart/get-cart-items',

            AddCheckout: environment.baseApiUrl + 'checkout/add-checkout', 
            DeleteCheckout: environment.baseApiUrl + 'checkout/delete-checkout', 

            AddOrder: environment.baseApiUrl + 'order/add-order', 
            DeleteOrder: environment.baseApiUrl + 'order/delete-order', 

            GetAllCategories: environment.baseApiUrl + 'categories/get-categories',

            GetReview: environment.baseApiUrl + 'review/get-review',
            GetReviewCount: environment.baseApiUrl + 'review/get-review-count',
            AddReview: environment.baseApiUrl + 'review/add-review',
            DeleteReview: environment.baseApiUrl + 'review/delete-review',

            DeleteCartItem: environment.baseApiUrl + 'cart/delete-item',
            RegisterUser: environment.baseApiUrl + 'Account/register',
            LoginUser: environment.baseApiUrl + 'Account/login',

            CreatePayPalOrder: environment.baseApiUrl + 'PayPal/create-paypal',
            CheckPayPalSuccess: environment.baseApiUrl + 'PayPal/check-success'
        };
    }
    get setting(): { [key: string]: string } {
        return this._config;
    }
    get(key: any) {
        return this._config[key];
    }
};