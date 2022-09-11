import {
  Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input, AfterViewInit, PLATFORM_ID, Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Products } from "../../../classes/product";
import { CartService } from '../../../../Services/Cart/cart.service';
import { Cart } from '../../../classes/cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() product: Products;
  @Input() currency: any;

  @ViewChild("cartModal", { static: false }) CartModal: TemplateRef<any>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public cart: Cart = {};
  private _subs: Subscription;


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  async openModal(product) {
    this._subs = await this.cartService.getCartProducts.subscribe(response => this.cart = response);
    // this.products = await this.products.filter(items => items.category == product.category && items.id != product.id);
    const status = await this.cartService.addToCart(product);
    if (status) {
      this.modalOpen = true;
      if (isPlatformBrowser(this.platformId)) { // For SSR 
        this.modalService.open(this.CartModal, {
          size: 'lg',
          ariaLabelledBy: 'Cart-Modal',
          centered: true,
          windowClass: 'theme-modal cart-modal CartModal'
        }).result.then((result) => {
          `Result ${result}`
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
    if (this._subs && !this._subs.closed)
    this._subs.unsubscribe();
  }

}
