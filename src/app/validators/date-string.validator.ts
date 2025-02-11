import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateStringValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(control.value) ? null : { invalidDate: true };
  };
}
