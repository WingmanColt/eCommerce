import { Injectable } from '@angular/core';

/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};*/

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  /* private authChangeSub = new Subject<boolean>()
   public authChanged = this.authChangeSub.asObservable();
 
   constructor(private http: HttpClient, private config: WebApiUrls) { super(); }
 
   public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
     this.authChangeSub.next(isAuthenticated);
   }
   private createCompleteRoute = (route: string, envAddress: string) => {
     return `${envAddress}/${route}`;
   }
 
   public loginUser(body: UserForAuthenticationDto) {
     return this.http.post<AuthResponseDto>(this.baseApiUrl + this.config.setting['LoginUser'], body);
   }
 
   public registerUser(request: Account): Observable<Account> {
     return this.http.post<Account>(this.baseApiUrl + this.config.setting['RegisterUser'], request);
   }
 
   public logout() {
     localStorage.removeItem("token");
     this.sendAuthStateChangeNotification(false);
     console.log("logout");
   }*/

  /*.pipe(catchError(this.handleError('registerUser', request))
  )
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
  }*/
}
