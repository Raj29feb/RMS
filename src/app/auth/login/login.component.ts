import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { noWhitespaceValidator } from '../../sdk/noWhitespace.validator';
import { SnackbarService } from '../../sdk/services/snackbar/snackbar.service';
import { AuthService } from '../../sdk/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  accountText: string = "don't have a account";
  registerText: string = 'register here';
  hidePassword$$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private unsubscribe$$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$$.next(null);
    this.unsubscribe$$.complete();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), noWhitespaceValidator],
      ],
    });
  }

  handleSubmit() {
    this.auth
      .login$(this.loginForm.value)
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe({
        next: (result: any) => {
          this.snackbar.openSnackBar(false, result.message);
          localStorage.setItem('token', result.data);
          this.router.navigate(['restaurants']);
        },
        error: (err) => {
          this.snackbar.openSnackBar(true, err.error.message);
        },
      });
  }
}
