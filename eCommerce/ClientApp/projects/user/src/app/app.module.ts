import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { PagesComponent } from './pages/pages.component';
import { ElementsComponent } from './elements/elements.component';
import { WebApiUrls } from './configs/webApiUrls';
import { FormsModule } from '@angular/forms';
import { CoreSharedModule } from '../../../core-shared/src/lib/core-shared.module';
import { httpInterceptorProviders } from './Interceptors';
import { RetryInterceptor } from './Interceptors/RetryInterceptor';




@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    PagesComponent,
    ElementsComponent
  ],
  imports: [
    // BrowserModule.withServerTransition({ appId: 'serverApp' }),
    //BrowserAnimationsModule,
    CoreSharedModule,
    FormsModule,
    NgbModule,

    LoadingBarRouterModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: false,
      enableHtml: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
      
    }),
    SharedModule,
    AppRoutingModule
  ],
  providers: [WebApiUrls, httpInterceptorProviders, RetryInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }

