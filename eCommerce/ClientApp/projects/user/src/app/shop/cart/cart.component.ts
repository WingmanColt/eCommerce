import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from '../../shared/classes/cart';
import { Products } from '../../shared/classes/product';
import { CartService } from '../../Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoreSharedService } from '../../../../../core-shared/src/lib/core-shared.service';
import { ProductsService } from '../../Services/Product/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  private _subs: Subscription;
  public ImageSrc: string
  public cart: Cart = {};

  constructor(public cartService: CartService,
    private router: Router,
    private core: CoreSharedService,
    public productsService: ProductsService,
    private toastrService: ToastrService) {
   // this.cartService.getCartProducts.subscribe(response => this.cart = response);

   if(this.core.getAccessToken())
   this._subs = this.cartService.getCartProducts.subscribe(response => this.cart = response);
 else
   this._subs = this.cartService.getCartProductsLocal().subscribe(response => this.cart.products = response);
  }
  ngOnDestroy(): void {
    if (this._subs && !this._subs.closed)
    this._subs.unsubscribe();
  }

  ngOnInit(): void {
  }


  // Increament
  increment(product, qty = 1) {
    this.cartService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product, qty = -1) {
    this.cartService.updateCartQuantity(product, qty);
  }

  public removeItem(product: Products) {
    this._subs = this.cartService.removeCartItem(product).subscribe((_oResult) => {
      if (_oResult.success) {
        this.router.navigate(['/shop/cart']);
        this.toastrService.success('Product was removed from your cart.')
      } else
        this.toastrService.warning('Product was not removed from your cart.');
    });
  }

  public getTotalDiscount(product: Products, quantity) : number
  {
    var discount = 0;
    discount += product.discountRate * quantity;
    return discount;
  }

}
