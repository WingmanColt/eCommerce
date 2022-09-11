import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductIds, Products } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { CheckoutService } from '../../Services/Checkout/checkout.service';
import { Checkout } from '../../shared/classes/checkout';
import { ApproveType } from '../../../../../core-shared/src/lib/classes/enums';
import { CartService } from '../../Services/Cart/cart.service';
import { Order } from '../../shared/classes/order';
import { CoreSharedService } from '../../../../../core-shared/src/lib/core-shared.service';
import { Router } from '@angular/router';
import { PaypalService } from '../../Services/Payments/paypal.service';
import { PaypPalInput } from '../../shared/classes/paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  private g_subs: Subscription;
  private g_subsPayPal: Subscription;
  private g_cartSubs: Subscription;
  private g_productSubs: Subscription;
  private g_localProductsubs: Subscription;

  public checkoutForm:  UntypedFormGroup;
  public products: Products[] = [];
  public cartItems: any[] = [];
  public orders: Order[] = [];
  public productIds: ProductIds[] = [];

  // public payPalConfig ? : IPayPalConfig;
  public payment: string = 'Stripe';
  public amount:  any;
  public paypalInput: PaypPalInput;

  constructor(private fb: UntypedFormBuilder,
    public productService: ProductService,
    public cartService: CartService,
    private core: CoreSharedService,
    private checkoutService: CheckoutService,
    private paypalService: PaypalService,
    private router: Router) { 
      
      if(this.core.getAccessToken())
      this.g_cartSubs = cartService.getCartItems().subscribe((_items) => this.cartItems = _items);
      else
      this.g_productSubs = cartService.getCartOrdersLocal().subscribe((_items) => this.orders = _items);

      this.g_localProductsubs = this.cartService.getCartProductsLocal().subscribe(response => this.products = response);

      this.buildForm();
      this.paypalInput = {};
  }

  
  buildForm() {

    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      adress: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required],
      approveType: ApproveType.Waiting,
      isGuest: false,
      pickupAtHome: true,
      cartItems: this.cartItems,
      products: this.products,
      orders: this.orders,
      //ProductIds: this.productIds
    })
  }


  ngOnDestroy(): void {
    if (this.g_cartSubs && !this.g_cartSubs.closed)
    this.g_cartSubs.unsubscribe();

    if (this.g_productSubs && !this.g_productSubs.closed)
    this.g_productSubs.unsubscribe();

    if (this.g_localProductsubs && !this.g_localProductsubs.closed)
    this.g_localProductsubs.unsubscribe();

    if (this.g_subs && !this.g_subs.closed)
      this.g_subs.unsubscribe();

      if (this.g_subsPayPal && !this.g_subsPayPal.closed)
      this.g_subsPayPal.unsubscribe();
  }

  ngOnInit(): void {
 //   this.productService.cartItems.subscribe(response => this.products = response);
  //  this.getTotal.subscribe(amount => this.amount = amount);
   // this.initConfig();
  }

  public get getTotal(): number {
    var totalPrice = 0;

    if(this.g_localProductsubs)
    {
    this.products.forEach(element => {
      totalPrice += element.price;
    });
    }
    return totalPrice;
  }

  public get getDiscount(): number {
    var totalPrice = 0;

    if(this.g_localProductsubs)
    {
    this.products.forEach(element => {
      totalPrice += element.discountRate;
    });
    }
    return totalPrice;
  }
  // Stripe Payment Gateway
  stripeCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        //this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
      }
    });
    handler.open({
      name: 'Multikart',
      description: 'Online Fashion Store',
      amount: this.amount * 100
    }) 
  }

  onSubmit(body: Checkout) {
    body.cartItems = this.cartItems;
    body.products = this.products;
    body.orders = this.orders;

    this.paypalInput.orderId = 15;
    this.paypalInput.quantity = 1;
    this.paypalInput.brandName = 'qwdwdw';
    this.paypalInput.currency = 'EUR';
    this.paypalInput.price = 12;
    this.paypalInput.name = 'sex';

   // this.productDetail.quantity = body.;
    //this.productDetail.productId = body.id;

  this.g_subsPayPal = this.paypalService.Create(this.paypalInput)
  .subscribe((_oResult) =>
  {
    /*this.g_subs = this.checkoutService.Create(body).subscribe((_oResult) =>
    {
    if(_oResult.success)
    {
      this.router.navigate(['/shop/checkout/success', _oResult.id]);
    }
    });*/
  });

  }


  // Paypal Payment Gateway
  private initConfig(): void {
    // this.payPalConfig = {
    //     currency: this.productService.Currency.currency,
    //     clientId: environment.paypal_token,
    //     createOrderOnClient: (data) => < ICreateOrderRequest > {
    //       intent: 'CAPTURE',
    //       purchase_units: [{
    //           amount: {
    //             currency_code: this.productService.Currency.currency,
    //             value: this.amount,
    //             breakdown: {
    //                 item_total: {
    //                     currency_code: this.productService.Currency.currency,
    //                     value: this.amount
    //                 }
    //             }
    //           }
    //       }]
    //   },
    //     advanced: {
    //         commit: 'true'
    //     },
    //     style: {
    //         label: 'paypal',
    //         size:  'small', // small | medium | large | responsive
    //         shape: 'rect', // pill | rect
    //     },
    //     onApprove: (data, actions) => {
    //         this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
    //         console.log('onApprove - transaction was approved, but not authorized', data, actions);
    //         actions.order.get().then(details => {
    //             console.log('onApprove - you can get full order details inside onApprove: ', details);
    //         });
    //     },
    //     onClientAuthorization: (data) => {
    //         console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    //     },
    //     onCancel: (data, actions) => {
    //         console.log('OnCancel', data, actions);
    //     },
    //     onError: err => {
    //         console.log('OnError', err);
    //     },
    //     onClick: (data, actions) => {
    //         console.log('onClick', data, actions);
    //     }
    // };
  }

}
