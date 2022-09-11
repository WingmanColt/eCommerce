import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreSharedService } from '../../../../../core-shared/src/lib/core-shared.service';
import { OperationResult } from '../../../../../core-shared/src/lib/Interfaces/operationResult';
import { WebApiUrls } from '../../configs/webApiUrls';
import { Checkout } from '../../shared/classes/checkout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "accessToken": '"' + this.core.getAccessToken() + '"',
    })
  }

  constructor(private http: HttpClient, private config: WebApiUrls, private core: CoreSharedService) { }

  public Create(body: Checkout): Observable<OperationResult> {
    if(!this.core.getAccessToken())
    body.isGuest = true;
    
    return this.http.post<OperationResult>(this.config.setting['AddCheckout'], body, this.httpOptions);
  }
  public Delete(body: Checkout): Observable<OperationResult> {
    if(!this.core.getAccessToken())
    body.isGuest = true;
    
    return this.http.post<OperationResult>(this.config.setting['DeleteCheckout'], body, this.httpOptions);
  }
}
