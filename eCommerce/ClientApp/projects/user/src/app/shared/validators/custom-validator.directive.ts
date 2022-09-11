import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appCustomValidator]',
  providers: [ // 
    {
      provide: NG_VALIDATORS, // connected with all validators
      useExisting: CustomValidatorDirective, // Add some extra logic to angular`s validation method
      multi: true
    }]
})
export class CustomValidatorDirective implements Validator {

  validate(control: AbstractControl) {
    return null;
  }

}
