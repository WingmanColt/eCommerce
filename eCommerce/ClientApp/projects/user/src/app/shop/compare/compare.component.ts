import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from "../../shared/classes/product";
import { ProductsService } from '../../Services/Product/products.service';
import { CartService } from '../../Services/Cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  public g_subs: Subscription;
  
  constructor(private router: Router, 
    public productService: ProductsService,
    public cartService: CartService) {
      
    this.g_subs = this.productService.getCompareItemsLocal().subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    if (this.g_subs && !this.g_subs.closed)
    this.g_subs.unsubscribe();
  }


   addToCart(product: any) {
    const status =  this.cartService.addToCart(product);
    if(status) {
      this.router.navigate(['/shop/cart']);
    }
  }

  removeItem(product: any) {
    this.productService.removeCompareItem(product);
  }

}
