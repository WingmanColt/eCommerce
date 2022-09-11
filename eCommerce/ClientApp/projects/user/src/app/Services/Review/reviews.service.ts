import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreSharedService } from '../../../../../core-shared/src/lib/core-shared.service';
import { OperationResult } from '../../../../../core-shared/src/lib/Interfaces/operationResult';
import { WebApiUrls } from '../../configs/webApiUrls';
import { Checkout } from '../../shared/classes/checkout';
import { Review } from '../../shared/classes/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }


  constructor(private http: HttpClient, private config: WebApiUrls, private core: CoreSharedService) { }


  public getReviews(review: Review): Observable<Review[]> {
    return this.http.post<Review[]>(this.config.setting['GetReview'], review, this.httpOptions);
  }

  public getReviewsCount(review: Review): Observable<number> {
    return this.http.post<number>(this.config.setting['GetReviewCount'], review, this.httpOptions);
  }


  public Create(body: Review): Observable<OperationResult> {
    return this.http.post<OperationResult>(this.config.setting['AddReview'], body, this.httpOptions);
  }
  public Delete(body: Review): Observable<OperationResult> {  
    return this.http.post<OperationResult>(this.config.setting['DeleteReview'], body, this.httpOptions);
  }
}
 