import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormBuilder } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { ApproveType, Gender, Gender_LabelMapping, Images, ItemType, ItemType_LabelMapping, Status, Variants } from '../../../../../../../core-shared/src/lib/classes/product';
import { Category } from '../../../../services/Product/classes/Categories';
import { AddProduct } from '../../../../services/Product/classes/Product';
import { ProductsService } from '../../../../services/Product/products.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public imagesCollection: Images[] = [];
  public variantsCollection: Variants[] = [];

  public categories: Category[];
  public productForm: UntypedFormGroup;
  // public Editor = ClassicEditor;
  public counter: number = 1;

  public url = [{
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  }
  ]

  public itemTypeLabelMapping = ItemType_LabelMapping;
  public itemTypes = Object.values(ItemType); // for nums .filter(value => typeof value === 'number');

  public genderLabelMapping = Gender_LabelMapping;
  public genders = Object.values(Gender).filter(value => typeof value === 'number');;

  constructor(private fb: UntypedFormBuilder, private productService: ProductsService) {

    this.getCategories();

    this.productForm = this.fb.group({
      title: ['', [Validators.required/*, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')*/]],
      description: ['qwddqwwdqdw'],
      details: ['', [Validators.required/*, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')*/]],
      videoUrl: [''],
      quantity: [this.counter, [Validators.required]],
      price: ['', [Validators.required/*, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')*/]],
      discountRate: 0,
      userId: [''],
      categoryId: [''],
      gender: [''],
      color: [''],
      size: [''],
      isShippable: true,
      pickupInStore: false,
      isReturnRequestAllowed: true,
      status: Status.Available,
      approveType: ApproveType.Waiting,
      itemType: ItemType.Physical,
      image: this.imagesCollection,
      //variant: this.variantsCollection
    })

  }

  increment() {
    this.counter += 1;

  }

  decrement() {
    this.counter -= 1;
  }

  getCategories() {
    this.productService.GetAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  /*  appendItems() {
      for (let i = 0; i < this.url.length; i++) {
        this.imagesCollection.push({ src: this.url[i].img });
      }
    }*/

  //FileUpload
  readUrl(event: any, i) {
    if (event.target.files.length === 0)
      return;

    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {

      this.url[i].img = reader.result?.toString();
      this.imagesCollection.push({ src: reader.result?.toString() })
      this.variantsCollection.push({ color: this.productForm.get<string>('color')?.value, size: this.productForm.get<string>('size')?.value })

      //console.log(reader.result.toString());
    }
    //console.log(event.target.files);
    //console.log(i);
  }

  onSubmit(body: AddProduct) {
    // this.appendImages();
    console.log(this.imagesCollection);
    console.log(body);

    body.image = this.imagesCollection;
    body.variant = this.variantsCollection;

    this.productService.Create(body).subscribe({
      next: (res: boolean) => {
        //console.log(res);
      },
      error: (response) => {
        //  console.log(response);
      }
    });
  }

  ngOnInit() {
  }

}
