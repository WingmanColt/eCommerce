import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';


@Injectable()

export class adminApiUrls {
    private _config: { [key: string]: string };
    constructor() {
        this._config = {
            AddProduct: environment.baseApiUrl + 'Product/create',
            GetAllCategories: environment.baseApiUrl + 'categories/get-categories',
            //GetSpecialProduct: 'product/getSpecialProduct',
            RegisterUser: environment.baseApiUrl + 'Account/register',
            LoginUser: environment.baseApiUrl + 'Account/login'
        };
    }
    get setting(): { [key: string]: string } {
        return this._config;
    }
    get(key: any) {
        return this._config[key];
    }
};