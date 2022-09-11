import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from "../../shared/classes/product";
import { ProductsService } from '../../Services/Product/products.service';
import { CartService } from '../../Services/Cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  public g_subs: Subscription;


  constructor(private router: Router, 
    public cartService: CartService,
    public productService: ProductsService) {
    this.g_subs = this.productService.getWishlistLocal().subscribe(response => this.products = response);
  }
  
  ngOnDestroy(): void {
    if (this.g_subs && !this.g_subs.closed)
    this.g_subs.unsubscribe();
  }

  ngOnInit(): void {
  }

   addToCart(product: any) {
    const status = this.cartService.addToCart(product);
    if(status) {
      this.router.navigate(['/shop/cart']);
      this.removeItem(product);
    }
  }

  removeItem(product: any) {
   this.productService.removeCompareItem(product);
  }
  public getTotalDiscount(product: Products) : number
  {
    var discount = 0;
    discount += product.discountRate;
    return discount;
  }
}

