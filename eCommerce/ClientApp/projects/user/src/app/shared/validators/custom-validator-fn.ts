import { AbstractControl } from '@angular/forms';

export function CustomIdValidatorFn(control: AbstractControl) {
    return (!control.value || !control.value.startsWith('00-')) ? { invalidid: true } : null;
}
