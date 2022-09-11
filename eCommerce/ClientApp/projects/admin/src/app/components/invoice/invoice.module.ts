import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class InvoiceModule { }
