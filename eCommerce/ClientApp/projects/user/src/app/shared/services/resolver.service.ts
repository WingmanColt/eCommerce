import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { ProductsService } from '../../Services/Product/products.service';
import { Products } from '../classes/product';


@Injectable({
  providedIn: 'root'
})
export class Resolver implements Resolve<Products> {

  public product: Products = {};

  constructor(
    private router: Router,
    public productService: ProductsService
  ) { }

  // Resolver
  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.productService.getProductDetails(route.params.slug).subscribe(product => {
      if (!product) { // When product is empty redirect 404
        this.router.navigateByUrl('/pages/404', { skipLocationChange: true });
      } else {
        this.product = product
      }
    })
    return this.product;
  }
}
