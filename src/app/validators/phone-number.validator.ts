import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    const phoneRegex = /^\+(?:[0-9][, ]?){6,14}[0-9]$/;
    return phoneRegex.test(control.value) ? null : { invalidDate: true };
  };
}
