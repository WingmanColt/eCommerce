import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../../shared/shared.module';


@NgModule({

  declarations: [OrdersComponent, TransactionsComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule,
    SharedModule,
    Ng2SearchPipeModule
  ]
})
export class SalesModule { }
