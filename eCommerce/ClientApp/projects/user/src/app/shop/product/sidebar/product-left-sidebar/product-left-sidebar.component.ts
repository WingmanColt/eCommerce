import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Products } from '../../../../shared/classes/product';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { ProductsService } from '../../../../Services/Product/products.service';
import { Status } from '../../../../../../../core-shared/src/lib/classes/product';
import { CartService } from '../../../../Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ReviewsService } from '../../../../Services/Review/reviews.service';
import { Review } from '../../../../shared/classes/review';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit, OnDestroy {

  //@Input() title: string;
  public product: Products = {};
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;
  public active = 1;

  public reviewForm: UntypedFormGroup;

  private g_subs: Subscription;
  private g_subsDetails: Subscription;
  private g_subsReview: Subscription;

  public title = this.route.snapshot.paramMap.get('slug');
  public AvaliableStatus: Status.Available;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private router: Router,
    public productService: ProductsService,
    public cartService: CartService,
    public reviewService: ReviewsService, 
    private toastrService: ToastrService) {

    this.g_subsDetails = this.productService.getProductDetails(this.title).subscribe(response => this.product = response);
    this.buildForm();
  }


  ngOnDestroy(): void {
    if (this.g_subsReview && !this.g_subsReview.closed)
    this.g_subsReview.unsubscribe();

    if (this.g_subs && !this.g_subs.closed)
    this.g_subs.unsubscribe();

    if (this.g_subsDetails && !this.g_subsDetails.closed)
    this.g_subsDetails.unsubscribe();

  }

  ngOnInit(): void {
  }

  buildForm() {
    this.reviewForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      email: ['', [Validators.required, Validators.email]],
      about: [''],
      productId: 0,
      productStars: 0,
      sendToSupport: false
    })
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

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants)?.length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  // Increament
  increment() {
    this.counter++;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter--;
  }

  // Add to cart
  addToCart(product: Products) {
    product.quantity = this.counter || 1;

    this.g_subs = this.cartService.addToCart(product).subscribe((_oResult) => {
      if (_oResult.success) {
        this.router.navigate(['/shop/cart']);
        this.toastrService.success("Product is added successfully.");
      }
      else
        this.toastrService.warning(_oResult.failureMessage);
    });

  }


  // Buy Now
  buyNow(product: any) {
    /* product.quantity = this.counter || 1;
     const status = this.cartService.addToCart(product);
     if (status)
       this.router.navigate(['/shop/checkout']);*/
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  onSubmit(body: Review) {
    body.productId = this.product.id;

    this.g_subsReview = this.reviewService.Create(body).subscribe((_oResult) =>
    {
    if(_oResult.success)
    {
      this.router.navigate(['/shop/product/info/', this.product.title]);
      this.toastrService.success('Your review has been sent successfuly.')
    }
    });
  }
}
