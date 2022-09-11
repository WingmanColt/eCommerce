import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './NoopInterceptor';
import { RetryInterceptor } from './RetryInterceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
];