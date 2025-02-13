import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateStringValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    return dateRegex.test(control.value) ? null : { invalidDate: true };
  };
}
