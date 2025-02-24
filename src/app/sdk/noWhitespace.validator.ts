import { AbstractControl, FormControl } from '@angular/forms';

let password = '';

export function noWhitespaceValidator(control: FormControl) {
  //The custom validator should return an error object ({ 'whitespace': true })
  // when the validation fails and return null when the validation succeeds.
  const isWhitespace = control.value || '';
  password = isWhitespace;
  const isValid = !isWhitespace.includes(' ');
  return isValid ? null : { whitespace: true };
}
export function matchPasswordValidator(group: AbstractControl) {
  const password = group.get('password');
  const confirmPassword = group.get('confirmPassword');

  // Check if both fields are available and not matching
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordsDoNotMatch: true };
  }

  return null; // Return null if passwords match
}
