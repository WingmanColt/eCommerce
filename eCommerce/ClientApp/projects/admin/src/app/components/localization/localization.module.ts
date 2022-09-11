import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalizationRoutingModule } from './localization-routing.module';
import { TranslationsComponent } from './translations/translations.component';
import { RatesComponent } from './rates/rates.component';
import { TaxesComponent } from './taxes/taxes.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TranslationsComponent, RatesComponent, TaxesComponent],
  imports: [
    CommonModule,
    LocalizationRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class LocalizationModule { }
