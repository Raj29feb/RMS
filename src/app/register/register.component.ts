import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api.service';
import { SnackbarService } from '../snackbar.service';
import {
  matchPasswordValidator,
  noWhitespaceValidator,
} from '../sdk/noWhitespace.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  accountText = 'already have an account';
  loginText = 'login here';
  hidePassword$$ = new BehaviorSubject(true);
  hideConfirmPassword$$ = new BehaviorSubject(true);
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.minLength(6), noWhitespaceValidator],
        ],
        confirmPassword: [
          '',
          [Validators.required, Validators.minLength(6), noWhitespaceValidator],
        ],
      },
      { validators: matchPasswordValidator } // Apply the matchPasswordValidator to the FormGroup
    );
  }
  handleSubmit() {
    console.log('form values::', this.registerForm.value);
    this.api.register$(this.registerForm.value).subscribe({
      next: (result) => {
        this.snackbar.openSnackBar(false, result.message);
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.snackbar.openSnackBar(true, err.message);
      },
      complete: () => {
        console.log('Register api hit compeleted');
      },
    });
  }
}
