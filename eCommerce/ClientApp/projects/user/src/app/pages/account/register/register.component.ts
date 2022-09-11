import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CoreSharedService } from '../../../../../../core-shared/src/lib/core-shared.service';
import { Account } from '../../../shared/classes/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  form: FormGroup;
  private _subs: Subscription;
  
  constructor(private accountService: CoreSharedService) { this.buildForm(); }

  buildForm() {
    this.form = new FormGroup({
      // id: new FormControl(null, [CustomValidatorFn]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.min(5)/*, (control) => this.validatePasswords(control, 'Password')*/]),
      ConfirmPassword: new FormControl('', [Validators.required, Validators.min(5)/*, (control) => this.validatePasswords(control, 'ConfirmPassword')]*/]),
      FirstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      LastName: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get emailControl() {
    return this.form.get('Email');
  }
  get firstNameControl() {
    return this.form.get('FirstName');
  }
  get lastNameControl() {
    return this.form.get('LastName');
  }
  get passwordControl() {
    return this.form.get('Password');
  }
  get cpasswordControl() {
    return this.form.get('ConfirmPassword');
  }

  validatePasswords(control: AbstractControl, name: string) {
    if (this.form === undefined || this.passwordControl?.value === '' || this.cpasswordControl?.value === '') {
      return null;
    }
    else if (this.passwordControl?.value === this.cpasswordControl?.value) {
      if (name === 'Password' && this.cpasswordControl?.value.hasError('passwordMismatch')) {
        this.passwordControl?.value.setErrors(null);
        this.cpasswordControl?.value.updateValueAndValidity();
      } else if (name === 'ConfirmPassword' && this.passwordControl?.value.hasError('passwordMismatch')) {
        this.cpasswordControl?.value.setErrors(null);
        this.passwordControl?.value.updateValueAndValidity();
      }
      return null;
    } else {
      return { 'passwordMismatch': { value: 'The provided passwords do not match' } };
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._subs && !this._subs.closed)
    this._subs.unsubscribe();
  }

  onSubmit(request: Account) {
    this._subs = this.accountService.registerUser(request).subscribe(_oResult => {

      // add toastr message
    });
  }
}
