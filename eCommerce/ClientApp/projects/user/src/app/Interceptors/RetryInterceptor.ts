import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, ReplaySubject, throwError, timer } from 'rxjs';
import {catchError, retry, share, tap} from 'rxjs/operators';

export const RETRY_COUNT = new HttpContextToken(() => 3);
export const ERROR_COUNT = new HttpContextToken(() => 0);
export const CACHE_TIMEOUT = 320 * 1000; // 180 SEC

export class RetryInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const retryCount = req.context.get(RETRY_COUNT);

    return next.handle(req).pipe(
        tap({
              // An error has occurred, so increment this request's ERROR_COUNT.
             error: () => req.context.set(ERROR_COUNT, req.context.get(ERROR_COUNT) + 1)
            }),
        // Retry the request a configurable number of times.
        retry(retryCount),

        // caching
        share({
          connector: () => new ReplaySubject(1),
          resetOnComplete: () => timer(CACHE_TIMEOUT)
          }),
        catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}