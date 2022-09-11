import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResult } from '../../../../../core-shared/src/lib/Interfaces/operationResult';
import { WebApiUrls } from '../../configs/webApiUrls';
import { PaypPalInput } from '../../shared/classes/paypal';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }


  constructor(private http: HttpClient, private config: WebApiUrls) { }


  public Create(input: any) {
    return this.http.put<OperationResult>(this.config.setting['CreatePayPalOrder'], input, this.httpOptions);
  }
  public CheckSuccess(token: string): Observable<OperationResult> {  
    return this.http.get<OperationResult>(this.config.setting['CheckPayPalSuccess'], this.httpOptions);
  }
}
