import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SdkModule } from '../sdk/sdk.module';
import { LogoModule } from '../logo/logo.module';
import { NavbarModule } from '../navbar/navbar.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    NavbarModule,
    SdkModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'register',
            component: RegisterComponent,
          },
        ],
      },
    ]),
    LogoModule,
  ],
})
export class AuthModule {}
