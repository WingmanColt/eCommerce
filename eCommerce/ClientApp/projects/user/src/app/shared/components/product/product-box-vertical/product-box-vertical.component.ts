import { Component, OnInit, Input } from '@angular/core';
import { Products } from "../../../classes/product";

@Component({
  selector: 'app-product-box-vertical',
  templateUrl: './product-box-vertical.component.html',
  styleUrls: ['./product-box-vertical.component.scss']
})
export class ProductBoxVerticalComponent implements OnInit {

  @Input() product: Products;
  @Input() currency: any;

  public ImageSrc: string

  constructor() { }

  ngOnInit(): void {
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Change Variants
  ChangeVariants(color, product) {
    product?.variant?.map((item) => {
      if (item.color === color) {
        product?.image?.map((img) => {
          if (img.image_id === item.image_id) {
            this.ImageSrc = img.src;
          }
        })
      }
    })
  }

}
