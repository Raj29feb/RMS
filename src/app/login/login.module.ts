import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SdkModule } from '../sdk/sdk.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LogoModule } from '../logo/logo.module';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NavbarModule,
    SdkModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
    LogoModule,
  ],
})
export class LoginModule {}
