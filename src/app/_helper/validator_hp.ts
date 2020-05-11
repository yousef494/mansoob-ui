import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
    })

export class ValidationHelper {


     isValid(formGroup: FormGroup, key) {
        let control = formGroup.controls[key];
        if (
            control == undefined ||
            control.disabled
        ) {
            return true;
        }
        return !(
            (control.dirty || control.touched) &&
         control.invalid && control.errors
         ); // (!control.touched) && control.valid;
    }

     messages = {
        required: 'This is required field',
        dateInvalid: 'Date invalid',
        email: 'Invalid email format',
        mustMatch: 'Mismatch inputs',
        minlength: 'Minimum length ',
        min: 'Invalid value',
        number: 'Invalid input: numeric value only'
    };

    /**
    * It returns validation message to be appear under the invalid control
    * @param key control name
    */
     getMsg(formGroup, key) {
        let errors = formGroup.controls[key].errors;

        if (errors == undefined) {
            return;
        }

        let validator = Object.keys(errors)[0];
        if (validator == 'dateInvalid') {
            return formGroup.controls[key].errors['msg'];
        } else {
            let msg = this.messages[validator];
            if(errors[validator]!=true){
                console.log(errors[validator]);
                msg = msg + ' ' + JSON.stringify(errors[validator]);
            }
            return msg;
        }
    }

}


export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

/**
 * Adapted from 
 * https://stackoverflow.com/questions/45057907/input-type-number-only-numeric-value-validation
 */
export class NumbericValidator{
    // Number only validation
    static numeric(control: AbstractControl) {
      let val = control.value;
      if (val === null || val === '') return null;
      if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'number': true };
      return null;
    }
  }