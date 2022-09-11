import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public accountForm: UntypedFormGroup;
  public permissionForm: UntypedFormGroup;
  public active = 1;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.createAccountForm();
    this.createPermissionForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      fname: [''],
      lname: [''],
      email: [''],
      password: [''],
      confirmPwd: ['']
    })
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }

  ngOnInit() {
  }

}
