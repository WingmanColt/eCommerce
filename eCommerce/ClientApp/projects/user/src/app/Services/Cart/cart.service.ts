import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CoreSharedService } from '../../../../../core-shared/src/lib/core-shared.service';
import { OperationResult } from '../../../../../core-shared/src/lib/Interfaces/operationResult';
import { WebApiUrls } from '../../configs/webApiUrls';
import { Cart, CartItem } from '../../shared/classes/cart';
import { Order } from '../../shared/classes/order';
import { Products } from '../../shared/classes/product';


const state = {
  cart: JSON.parse(localStorage['cartItems'] || '[]')
}


@Injectable({
  providedIn: 'root'
})
export class CartService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "accessToken": '"' + this.core.getAccessToken() + '"',
    })
  }

  public Order: Order[] = [];
  public CartItem: CartItem = {};
  public OpenCart: boolean = false;

  constructor(private http: HttpClient, 
    private config: WebApiUrls, 
    private core: CoreSharedService,
    private toastrService: ToastrService) {
      this.orderUpdate();
  }
  orderUpdate() {
    if(!this.Order )
    {
    state.cart.forEach(element => {
      this.Order.push({
        productId: element.productId, 
        quantity: element.quantity,
        willEarnRewardPoints: 0,
        isPayed: false
      })
    });
  }
  }

  private get cartProductsData(): Observable<Cart> {
    return this.http.get<Cart>(this.config.setting['GetCart'], this.httpOptions);
  }
  public get getCartProducts(): Observable<Cart> {
    return this.cartProductsData;
  }

  
  public getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.config.setting['GetCartItems'], this.httpOptions);
  }
  
  public getCartOrdersLocal() : Observable<Order[]>{

    const itemsStream = new Observable(observer => {
      observer.next(this.Order);
      observer.complete();
    });
    return <Observable<Order[]>>itemsStream; 

    //return this.http.post<Products[]>(this.config.setting['GetProductsByIds'], state.cart, this.httpOptions);
  }

  public getCartProductIdsLocal() : Observable<Products[]>{
    const itemsStream = new Observable(observer => {
      observer.next(state.cart);
      observer.complete();
    });
    return <Observable<Products[]>>itemsStream; 
   }

   public getCartProductsLocal() : Observable<Products[]>{
    return this.http.post<Products[]>(this.config.setting['GetProductsByIds'], state.cart, this.httpOptions);
  }
  // Add to Cart
  public addToCart(product: Products): Observable<OperationResult> {
    this.CartItem.productId = product.id;
    this.OpenCart = true; // If we use cart variation modal

    if(this.core.getAccessToken())
    return this.http.post<OperationResult>(this.config.setting['AddCartItem'], this.CartItem, this.httpOptions);
    else {
      return this.addToCartLocal(product);
  }
  
  }

  public addToCartLocal(product: Products): any {
    const cartItem = state.cart.find(item => item.productId === product.id);
    const qty = product.quantity ? product.quantity : 1;
    const items = cartItem ? cartItem : product;
    const stock = this.calculateStockCounts(items, qty);
    const id = Object.assign({productId: product.id}) as { productId: number};
    if (!stock) return false

    if (cartItem) {
      cartItem.quantity += qty
    } else {
      state.cart.push({
        ...id,
        quantity: qty
      //  checkoutId: 
      })
    }

    this.OpenCart = true; // If we use cart variation modal
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    this.toastrService.error('Product '+product.title+' has been added in cart.');

    return true;
  }


  // Update Cart Quantity
  public updateCartQuantity(product: Products, quantity: number): Products | boolean {
    return state.cart.find((items, index) => {
      if (items.productId === product.id) {
        const qty = state.cart[index].quantity + quantity
        const stock = this.calculateStockCounts(state.cart[index], quantity)
        if (qty !== 0 && stock) {
          state.cart[index].quantity = qty
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        return true
      }
    })
  }

  // Calculate Stock Counts
  public calculateStockCounts(product: Products, quantity) {
    var qty = product.quantity + quantity
    var stock = product.quantity

    if (stock == 0) {
      this.toastrService.error('You can not add more items than available. In stock ' + stock + ' items.');
      return false
    }
    return true
  }
  public calculateStockCountsLocal(product: Products) {
    const cartItem = state.cart.find(item => item.productId === product.id);
    if (cartItem) {
      return cartItem.quantity;
    }
  }
    // Total amount 
    public cartTotalAmount(product: Products[]): number {      
        var totalCost = 0;
        
        if(!product)
        return 0;

        product.forEach(element => {
          
          totalCost += element.price - element.discountRate;
        });

      return totalCost
    }
    // Total amount 
    public cartTotalAmount2(products: Products[]): number {
      var totalCost = 0;
      var quantityToBuy = 0;

      if(products.length > 0)
      {

      products.forEach(element => {
        const cartItem = state.cart.find(item => item.productId === element.id);
        quantityToBuy = cartItem.quantity;
        totalCost += element.price - element.discountRate;
      });
    }
    
    return totalCost * quantityToBuy;
  }


  // Remove Cart items
  public removeCartItemLocal(product: Products): any {
    const index = state.cart.indexOf(product);
    state.cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    this.toastrService.error('You removed '+product.title+' from your cart.');

    return true
  }

  public removeCartItem(product: Products): Observable<OperationResult> {
  if(this.core.getAccessToken())
    return this.http.post<OperationResult>(this.config.setting['DeleteCartItem'], product, this.httpOptions);
  else
    return this.removeCartItemLocal(product);
  }

  
}
