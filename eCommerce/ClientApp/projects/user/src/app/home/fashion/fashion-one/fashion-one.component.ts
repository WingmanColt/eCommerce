import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product, Products } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { ProductsService } from '../../../Services/Product/products.service';
import { Subscription } from 'rxjs';
import { Category } from '../../../shared/classes/Categories';

const state = {
  specialProduct: JSON.parse(localStorage['specialProducts'] || '[]'),
  specialProduct_2: JSON.parse(localStorage['specialProducts_2'] || '[]'),
  specialProduct_3: JSON.parse(localStorage['specialProducts_3'] || '[]'),
}


@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})

export class FashionOneComponent implements OnInit, OnDestroy {

  private _subsSpecial: Subscription;
  private _subsCategories: Subscription;

  public productSpecial: Products[] = [];

  public products: Product[] = [];
  public categories: Category[];

  public productCollections: any[] = ['new arrivals', 'trending', 'best sellers'];
  public active;

  constructor(public productService: ProductService, public productsService: ProductsService) {
    /* this.productService.getProducts.subscribe(response => {
       this.products = response.filter(item => item.type == 'fashion');
       // Get Product Collection
       this.products.filter((item) => {
         item.collection.filter((collection) => {
           const index = this.productCollections.indexOf(collection);
           if (index === -1) this.productCollections.push(collection);
         })
       })
     });*/

     this._subsCategories = this.productsService.GetAllCategories().subscribe(res => this.categories = res);
     this._subsSpecial = this.productsService.getProductSpecial.subscribe(x => this.productSpecial = x);
  }
  ngOnDestroy(): void {
    if (this._subsSpecial && !this._subsSpecial.closed)
    this._subsSpecial.unsubscribe();
    
    if (this._subsCategories && !this._subsCategories.closed)
    this._subsCategories.unsubscribe();

  }


  /*this.productsListing = response.filter(item => item.approveType == 1);*/

  /*getCollection(){

  // Get Product Collection
   this.products.filter((item) => {
     item.collection.filter((collection) => {
       const index = this.productCollections.indexOf(collection);
       if (index === -1) this.productCollections.push(collection);
     })
   })*/

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [{
    title: 'welcome to fashion',
    subTitle: 'Men fashion',
    image: 'assets/images/slider/1.jpg'
  }, {
    title: 'welcome to fashion',
    subTitle: 'Women fashion',
    image: 'assets/images/slider/2.jpg'
  }]

  // Collection banner
  public collections = [{
    image: 'assets/images/collection/fashion/1.jpg',
    save: 'save 50%',
    title: 'men'
  }, {
    image: 'assets/images/collection/fashion/2.jpg',
    save: 'save 50%',
    title: 'women'
  }];

  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/3.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/4.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

  ngOnInit(): void {
  }

  // Product Tab collection
  /*getCollectionProducts(collection) {
    return this.productSpecial.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }*/

}
