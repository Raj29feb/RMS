import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { noWhitespaceValidator } from '../sdk/noWhitespace.validator';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  accountText = "don't have a account";
  registerText = 'register here';
  hidePassword$$ = new BehaviorSubject(true);
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      //directly passing { 'whitespace': true } as a validator, which is not
      // valid because Angular expects a function as a validator, not a static object.
      password: [
        '',
        [Validators.required, Validators.minLength(6), noWhitespaceValidator],
      ],
    });
  }
  handleSubmit() {
    this.api.login$(this.loginForm.value).subscribe({
      next: (result: any) => {
        this.snackbar.openSnackBar(false, result.message);
        localStorage.setItem('token', result.data);
        this.router.navigate(['restaurants']);
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
