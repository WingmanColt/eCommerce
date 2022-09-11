import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-vendors',
  templateUrl: './create-vendors.component.html',
  styleUrls: ['./create-vendors.component.scss']
})
export class CreateVendorsComponent implements OnInit {
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


  ngOnInit() { }

}
