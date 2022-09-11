import { NgModule } from '@angular/core';
import { CoreSharedComponent } from './core-shared.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ApiConfig } from './configs/ApiConfig';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  bootstrap: [
    CoreSharedComponent
  ],
  declarations: [
    CoreSharedComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ApiConfig/*,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }*/]
})
export class CoreSharedModule { }
