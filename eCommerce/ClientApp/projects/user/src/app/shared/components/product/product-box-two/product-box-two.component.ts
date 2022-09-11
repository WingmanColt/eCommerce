import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { Products } from "../../../classes/product";
import { ProductsService } from "../../../../Services/Product/products.service";
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../Services/Cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-box-two',
  templateUrl: './product-box-two.component.html',
  styleUrls: ['./product-box-two.component.scss']
})
export class ProductBoxTwoComponent implements OnInit, OnDestroy {

  @Input() product: Products;
  @Input() currency: any = "eur"; // Default Currency
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;

  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  private _subs: Subscription;
  public ImageSrc: string


  constructor(private productService: ProductsService,
    public cartService: CartService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.loader) {
      setTimeout(() => { this.loader = false; }, 2000); // Skeleton Loader
    }
  }
  ngOnDestroy(): void {

    if (this._subs && !this._subs.closed)
    this._subs.unsubscribe();
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants)?.length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Change Variants
  ChangeVariants(color, product) {
    product.variants?.map((item) => {
      if (item.color === color) {
        product.images?.map((img) => {
          if (img?.image_id === item?.image_id) {
            this.ImageSrc = img?.src == null ? '' : img.src;
          }
        })
      }
    })
  }

  ChangeVariantsImage(src) {
    this.ImageSrc = src == null ? '' : src;
  }

  addToCart(product: Products) {
    this._subs = this.cartService.addToCart(product).subscribe((_oResult) => {
      if (_oResult.success)
        this.toastrService.success("Product is added succesfully.");
      else
        this.toastrService.warning(_oResult.failureMessage);
    });

  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  addToCompare(product: any) {
    this.productService.addToCompare(product);
  }
}
