import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { NgChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartistModule } from 'ng-chartist'
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    NgChartsModule,
    Ng2GoogleChartsModule,
    NgxChartsModule,
    ChartistModule,
    ReportsRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class ReportsModule { }
