import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../../admin/src/app/services/Product/classes/Categories';
import { ProductsService } from '../../../Services/Product/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: Category[];
  public collapse: boolean = true;

  constructor(public productService: ProductsService) { 
    this.productService.GetAllCategories().subscribe(res => {
      this.categories = res;
    });
   }

  ngOnInit(): void {
  }



}
