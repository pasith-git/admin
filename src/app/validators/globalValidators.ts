import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from "moment";

export const patterns: { [key: string]: RegExp } = {
  stringValid: /^[\p{L}]{1,}$/u,
}

export const messageError = {
  stringOnly: 'ຕົວອັກສອນຢ່າງດຽວ',
  cantNull: 'ບໍ່ໃຫ້ວ່າງ'
}

export function regexValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}


export function ipAddressValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexTest = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/.test(control.value);
    return regexTest ? null : { ipAddressFailed: control.value };
  }
}

export function portValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexTest = /^([0-9]){1,65535}$/.test(control.value);
    return regexTest ? null : { portFailed: control.value };
  }
}
export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexTest = /^([0-9]){1,}$/.test(control.value);
    if (control.value) {
      return regexTest ? null : { numberFailed: control.value };
    }
    return null
  }
}

export function minValidator(num: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexTest = new RegExp(`^([0-9]){${num}}$`).test(control.value);
    if (control.value) {
      return regexTest ? null : { minNumberFailed: control.value };
    }
    return null
  }
}

export const confirmPassword = (group: AbstractControl):  ValidationErrors | null => { 
  let pass = group.get('password')!.value;
  let confirmPass = group.get('cPassword')!.value
  return pass === confirmPass ? null : { notSame: true }
}

export function amountValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexTest = /^[1-9*0]\d*$/.test(control.value);
    if (control.value) {
      return regexTest ? null : { amountFailed: control.value };
    }
    return null
  }
}
export function stringValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexTest = /^([\u0E80-\u0EFF\u0E00-\u0E7Fa-zA-Z]){1,}$/.test(control.value);
    return regexTest ? null : { stringFailed: control.value };
  }
}
export function englishValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexTest = /^([a-zA-Z\s]){1,}$/.test(control.value);
    return regexTest ? null : { enFailed: control.value };
  }
}

export function nationalRegexPatternLaosValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regexTest = /^[\u0e80-\u0eff\s]{1,}$/.test(control.value);
    return regexTest ? null : { loFailed: control.value };
  }
}


export function dateValidators(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateTest = moment(control.value).isSameOrBefore(moment(), 'day');
    return !dateTest ? null : { dateBeforeFailed: control.value };
  }
}