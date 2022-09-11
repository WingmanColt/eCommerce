import { Component, OnInit, PLATFORM_ID, Inject, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Cart } from '../../classes/cart';
import { CartService } from '../../../Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../../classes/product';
import { Subscription } from 'rxjs';
import { CoreSharedService } from '../../../../../../core-shared/src/lib/core-shared.service';
import { ProductsService } from '../../../Services/Product/products.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  public ImageSrc: string
  public search: boolean = false;
  public cart: Cart = {};

  private _subs: Subscription;
  private _removeSubs: Subscription;


  public languages = [{
    name: 'English',
    code: 'en'
  }, {
    name: 'French',
    code: 'fr'
  }];

  public currencies = [{
    name: 'Euro',
    currency: 'EUR',
    price: 0.90 // price of euro
  }, {
    name: 'Rupees',
    currency: 'INR',
    price: 70.93 // price of inr
  }, {
    name: 'Pound',
    currency: 'GBP',
    price: 0.78 // price of euro
  }, {
    name: 'Dollar',
    currency: 'USD',
    price: 1 // price of usd
  }]

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public cartService: CartService,
    public productService: ProductsService,
    private core: CoreSharedService,
    private toastrService: ToastrService) {
      
  if(this.core.getAccessToken())
    this._subs = this.cartService.getCartProducts.subscribe(response => this.cart = response);
  else
    this._subs = this.cartService.getCartProductsLocal().subscribe(response => this.cart.products = response);

  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    if (this._subs && !this._subs.closed)
      this._subs.unsubscribe();

    if (this._removeSubs && !this._removeSubs.closed)
      this._removeSubs.unsubscribe();
  }

  searchToggle() {
    this.search = !this.search;
  }

  changeLanguage(code) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }


  removeItem(product: Products) {
    this._removeSubs = this.cartService.removeCartItem(product).subscribe((_oResult) => {
      if (_oResult.success) {
        this.toastrService.success('Product was removed from your cart.');
      } else
        this.toastrService.warning('Product was not removed from your cart.')
    });
  }


  changeCurrency(currency: any) {
    //this.productService.Currency = currency
  }

}
