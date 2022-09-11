import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router: Router) { }

  private handleError = (error: HttpErrorResponse) => {
    /* if (error.status === 404) {
       return this.handleNotFound(error);
     }
     else if (error.status === 400) {
       return this.handleBadRequest(error);
     }*/
    if (error.status === 401) {
      return this.handleUnauthorized(error);
    }
  }

  private handleUnauthorized = (error: HttpErrorResponse) => {
    if (this.router.url === '/pages/login') {
      return 'Authentication failed. Wrong Username or Password';
    }
    else {
      this.router.navigate(['/pages/login']);
      return error.message;
    }
  }
}
