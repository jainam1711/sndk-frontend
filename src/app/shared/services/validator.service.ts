import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any, fieldName?: any): void {
    if (!fieldName) {
      fieldName = 'This';
    }
    const config = {
      required: `${fieldName} is required`,
      email: 'Please enter a valid email address'
    };
    return config[validatorName];
  }

  // Validate all fields on submit
  validateAllFormFields(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
    const invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
    for (const invalid of invalidFields) {
      invalid.focus();
      if (invalid === document.activeElement) { break; }
    }
  }

}
