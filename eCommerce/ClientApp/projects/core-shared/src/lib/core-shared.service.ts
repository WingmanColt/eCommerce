import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from './configs/ApiConfig';
import { Account, IUser } from './classes/account';
import { Observable } from 'rxjs';
import { AuthResponseDto, UserForAuthenticationDto } from './Interfaces/Authentication';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreSharedService {

  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  private loggedUserChangeSub = new Subject<IUser>()
  public isUserLogged = this.loggedUserChangeSub.asObservable();

  constructor(private http: HttpClient, private config: ApiConfig) { }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }


  public loginUser(body: UserForAuthenticationDto) {
    return this.http.post<AuthResponseDto>(this.config.setting['LoginUser'], body);
  }

  public registerUser(request: Account): Observable<Account> {
    return this.http.post<Account>(this.config.setting['RegisterUser'], request);
  }

  public logout() {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public getUser(): Observable<IUser> {
    return this.http.get<IUser>(this.config.setting['GetUser'], {
      headers: {
        "accessToken": '"' + this.getAccessToken() + '"',
      }
    });
  }

  public getAccessToken(): string | null {
    return localStorage.getItem("token");
  }
}
