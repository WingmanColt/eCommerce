import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = localStorage.getItem("token");
    request = request.clone({
      setHeaders: {
        "accessToken": '"' + { token } + '"',
      }
    });

    return next.handle(request);
  }
}