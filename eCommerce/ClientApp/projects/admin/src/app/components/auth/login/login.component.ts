import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from '../../../../../../core-shared/src/lib/classes/account';
import { CoreSharedService } from '../../../../../../core-shared/src/lib/core-shared.service';
import { AuthResponseDto, UserForAuthenticationDto } from '../../../../../../core-shared/src/lib/Interfaces/Authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private returnUrl: string;
  private user: IUser;

  form: FormGroup;
  public isUserAuthenticated: boolean = false;
  public loginForm: UntypedFormGroup;
  public registerForm: UntypedFormGroup;
  public active = 1;

  constructor(private accountService: CoreSharedService, private router: Router, private route: ActivatedRoute) { this.buildForm(); }

  buildForm() {
    this.form = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.min(5)])
    });
  }

  /*  constructor(private formBuilder: UntypedFormBuilder) {
      this.createLoginForm();
      this.createRegisterForm();
    }*/

  owlcarousel = [
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    }
  ]
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  get emailControl() {
    return this.form.get('Email');
  }
  get passwordControl() {
    return this.form.get('Password');
  }

  ngOnInit(): void {
    this.accountService.getUser().subscribe((response) => {
      this.user = response;
      console.log(this.user);

      if (this.user) {
        this.router.navigate(['/'])
      }
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }



  onSubmit(body: UserForAuthenticationDto) {
    this.accountService.loginUser(body).subscribe({
      next: (res: AuthResponseDto) => {
        localStorage.setItem("token", res.token);
        this.accountService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this.router.navigate([this.returnUrl])
      },
      error: (response) => {
      }
    });
  }

}
