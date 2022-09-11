import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ReviewsService } from '../../../Services/Review/reviews.service';
import { Review } from '../../../shared/classes/review';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  private g_subs: Subscription;
  public messageForm: UntypedFormGroup;


  constructor(
    private fb: UntypedFormBuilder, 
    public reviewService: ReviewsService, 
    private router: Router,
    private toastrService: ToastrService) 
    { this.buildForm(); }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.g_subs && !this.g_subs.closed)
      this.g_subs.unsubscribe();
  }

  buildForm() {
    this.messageForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      email: ['', [Validators.required, Validators.email]],
      about: [''],
      sendToSupport: true
    })
  }

  onSubmit(body: Review) {
    this.g_subs = this.reviewService.Create(body).subscribe((_oResult) =>
    {
    if(_oResult.success)
    {
      this.router.navigate(['/']);
      this.toastrService.success('Your message has been sent successfuly.')
    }
    });
  }

}
