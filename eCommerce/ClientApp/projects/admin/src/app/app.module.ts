import { NgModule } from '@angular/core';
import { AgGridModule } from '@ag-grid-community/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreSharedModule } from '../../../core-shared/src/lib/core-shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './components/products/products.module';
import { SalesModule } from './components/sales/sales.module';
import { CouponsModule } from './components/coupons/coupons.module';
import { PagesModule } from './components/pages/pages.module';
import { MediaModule } from './components/media/media.module';
import { MenusModule } from './components/menus/menus.module';
import { VendorsModule } from './components/vendors/vendors.module';
import { UsersModule } from './components/users/users.module';
import { LocalizationModule } from './components/localization/localization.module';
import { InvoiceModule } from './components/invoice/invoice.module';
import { SettingModule } from './components/setting/setting.module';;
import { ReportsModule } from './components/reports/reports.module';
import { AuthModule } from './components/auth/auth.module';
import { adminApiUrls } from './configs/adminApiUrls';
import { AuthGuard } from './guards/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreSharedModule,
    AppRoutingModule,
    DashboardModule,
    InvoiceModule,
    SettingModule,
    ReportsModule,
    AuthModule,
    SharedModule,
    LocalizationModule,
    ProductsModule,
    SalesModule,
    VendorsModule,
    CouponsModule,
    PagesModule,
    MediaModule,
    MenusModule,
    UsersModule,
    AgGridModule,
    BrowserAnimationsModule
  ],
  providers: [adminApiUrls, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

