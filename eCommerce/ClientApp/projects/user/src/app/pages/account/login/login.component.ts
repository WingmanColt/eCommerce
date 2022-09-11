import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthResponseDto, UserForAuthenticationDto } from '../../../Interfaces/Authentication';
import { CoreSharedService } from '../../../../../../core-shared/src/lib/core-shared.service';
import { IUser } from '../../../../../../core-shared/src/lib/classes/account';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private _subs: Subscription;
  private returnUrl: string;
 // private user: IUser;

  form: FormGroup;
  public isUserAuthenticated: boolean = false;

  constructor(private accountService: CoreSharedService, private router: Router, private route: ActivatedRoute) { 
    this.accountService.getUser().subscribe((_oResult) => {
      if (_oResult) {
        this.router.navigate(['/'])
      }
    });

    this.buildForm(); 
  }


  buildForm() {
    this.form = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.min(5)])
    });
  }

  get emailControl() {
    return this.form.get('Email');
  }
  get passwordControl() {
    return this.form.get('Password');
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  ngOnDestroy(): void {
    if (this._subs && !this._subs.closed)
    this._subs.unsubscribe();
  }

  onSubmit(body: UserForAuthenticationDto) {
    this._subs = this.accountService.loginUser(body).subscribe({
      next: (res: AuthResponseDto) => {
        localStorage.setItem("token", res.token);
        this.accountService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this.router.navigate([this.returnUrl])
      }
    });
  }

}
