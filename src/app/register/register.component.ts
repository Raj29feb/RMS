import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { SnackbarService } from '../sdk/services/snackbar/snackbar.service';
import {
  matchPasswordValidator,
  noWhitespaceValidator,
} from '../sdk/noWhitespace.validator';
import { AuthService } from '../sdk/services/auth/auth.service';

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
    private auth: AuthService,
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
      { validators: matchPasswordValidator }
    );
  }

  handleSubmit() {
    this.auth.register$(this.registerForm.value).subscribe({
      next: (result) => {
        this.snackbar.openSnackBar(false, result.message);
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.snackbar.openSnackBar(true, err.error.message);
        if (err.status === 403) {
          this.router.navigate(['login']);
          localStorage.clear();
        }
      },
    });
  }
}
