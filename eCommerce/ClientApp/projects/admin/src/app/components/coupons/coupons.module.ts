import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CouponsRoutingModule } from './coupons-routing.module';
import { ListCouponComponent } from './list-coupon/list-coupon.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListCouponComponent, CreateCouponComponent],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class CouponsModule { }
