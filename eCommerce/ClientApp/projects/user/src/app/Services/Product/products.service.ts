import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../../shared/classes/product';
import { WebApiUrls } from '../../configs/webApiUrls';
import { ToastrService } from 'ngx-toastr';
import { CoreSharedService } from '../../../../../core-shared/src/lib/core-shared.service';
import { Category } from '../../shared/classes/Categories';


const state = {
  wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
  compare: JSON.parse(localStorage['compareItems'] || '[]'),
  cart: JSON.parse(localStorage['cartItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "accessToken": '"' + this.core.getAccessToken() + '"',
    })
  }

  constructor(private http: HttpClient, private config: WebApiUrls,
    private toastrService: ToastrService, private core: CoreSharedService) {
  }

  public Products: Products[];
  public Currency = { name: 'Dollar', currency: 'USD', price: 1 } // Default Currency

  private get specialProduct(): Observable<Products[]> {
    return this.http.get<Products[]>(this.config.setting['GetSpecialProduct']);
  }
  public GetAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.config.setting['GetAllCategories']);
  }

  // Get Products
  public get getProductSpecial(): Observable<Products[]> {
    return this.specialProduct;
  }

  public getProductDetails(slug: string | null): Observable<Products> {
    return this.http.get<Products>(this.config.setting['GetProductDetails'] + '?title='+ slug?.replace(' ', '-'));
  }

  // Add to Wishlist
  public addToWishlist(product): any {
    const wishlistItem = state.wishlist.find(item => item.productId === product.id)
    const id = Object.assign({productId: product.id}) as { productId: number};

    if (!wishlistItem) {
      state.wishlist.push({
        ...id
      })
    }
    this.toastrService.success('Product has been added in wishlist.');
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }
  // Remove Wishlist items
  public removeWishlistItem(product: Products): any {
    const index = state.wishlist.indexOf(product);
    state.wishlist.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  // Add to Compare
  public addToCompare(product): any {
    const compareItem = state.compare.find(item => item.productId === product.id)
    const id = Object.assign({productId: product.id}) as { productId: number};

    if (!compareItem) {
      state.compare.push({
        ...id
      })
    }
    this.toastrService.success('Product has been added in compare.');
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }
    // Remove Compare items
    public removeCompareItem(product: Products): any {
      const index = state.compare.indexOf(product);
      state.compare.splice(index, 1);
      localStorage.setItem("compareItems", JSON.stringify(state.compare));
      return true
    }

  // Calculate Stock Counts
  public calculateStockCounts(product, quantity) {
    const qty = product.quantity + quantity
    const stock = product.stock
    if (stock < qty || stock == 0) {
      this.toastrService.error('You can not add more items than available. In stock ' + stock + ' items.');
      return false
    }
    return true
  }


  public getCompareItemsLocal() : Observable<Products[]>{
    console.log(state.compare);
    return this.http.post<Products[]>(this.config.setting['GetProductsByIds'], state.compare, this.httpOptions);
  } 
  
   public getWishlistLocal() : Observable<Products[]>{
    return this.http.post<Products[]>(this.config.setting['GetProductsByIds'], state.wishlist, this.httpOptions);
  }
  public getCartProductsLocal() : Observable<Products[]>{
    return this.http.post<Products[]>(this.config.setting['GetProductsByIds'], state.cart, this.httpOptions);
  }


    // Product
    public products(){
      return this.http.get<Products[]>(this.config.setting['GetProducts']);
    }
  
    // Get Products By Slug
    public getProductBySlug(slug: string): Observable<Products> {
      return this.http.get<Products>(this.config.setting['GetProductDetails'] + slug?.replace(' ', '-'));
    }
    // Get Product Filter
    public filterProducts(filter: any) {
      //this.products();
      /*.pipe(map(product =>
        product.filter((item: Products) => {
          if (!filter.length) return true
          const Tags = filter.some((prev) => { // Match Tags
            if (item.title) {
              if (item.title.includes(prev)) {
                return prev
              }
            }
          })
          return Tags
        })
      ))
*/
      return this.Products;
    }
  
    // Sorting Filter
    public sortProducts(products: Products[], payload: string): any {
  
      if (payload === 'ascending') {
        return products.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          } else if (a.id > b.id) {
            return 1;
          }
          return 0;
        })
      } else if (payload === 'a-z') {
        return products.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          } else if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
      } else if (payload === 'z-a') {
        return products.sort((a, b) => {
          if (a.title > b.title) {
            return -1;
          } else if (a.title < b.title) {
            return 1;
          }
          return 0;
        })
      } else if (payload === 'low') {
        return products.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          } else if (a.price > b.price) {
            return 1;
          }
          return 0;
        })
      } else if (payload === 'high') {
        return products.sort((a, b) => {
          if (a.price > b.price) {
            return -1;
          } else if (a.price < b.price) {
            return 1;
          }
          return 0;
        })
      }



    }
}

