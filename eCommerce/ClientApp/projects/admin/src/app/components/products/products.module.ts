import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { CKEditorModule } from 'ngx-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';
import { CategoryComponent } from './physical/category/category.component';
import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalSubCategoryComponent } from './digital/digital-sub-category/digital-sub-category.component';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../../shared/shared.module';
// import { NgbdSortableHeader } from "src/app/shared/directives/NgbdSortableHeader";
// import {  } from '../../directives/shorting.directive/';


@NgModule({
  declarations: [CategoryComponent, SubCategoryComponent, ProductListComponent, AddProductComponent, DigitalCategoryComponent, DigitalSubCategoryComponent, DigitalListComponent, DigitalAddComponent, ProductDetailComponent
  ],
  imports: [
    Ng2SearchPipeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    NgbModule,
    GalleryModule,
    CKEditorModule,
    NgxDropzoneModule,
    SharedModule
  ],
  exports: [SubCategoryComponent],
  bootstrap: [SubCategoryComponent],
  providers: [
    NgbActiveModal
  ]
})
export class ProductsModule { }
