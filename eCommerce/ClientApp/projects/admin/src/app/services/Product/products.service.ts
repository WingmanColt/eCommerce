import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { adminApiUrls } from '../../configs/adminApiUrls';
import { Category } from './classes/Categories';
import { AddProduct } from './classes/Product';
import { CoreSharedService } from '../../../../../core-shared/src/lib/core-shared.service';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "accessToken": '"' + this.core.getAccessToken() + '"',
    })
  }

  constructor(private http: HttpClient, private config: adminApiUrls, private core: CoreSharedService) {
  }

  public Create(body: AddProduct): Observable<boolean> {
    return this.http.post<boolean>(this.config.setting['AddProduct'], body, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );

  }

  public GetAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.config.setting['GetAllCategories']).pipe(
      catchError(this.errorHandler)
    );
  }


  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

