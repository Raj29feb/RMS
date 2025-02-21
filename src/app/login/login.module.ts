import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { SdkModule } from '../sdk/sdk.module';
import { LogoModule } from '../logo/logo.module';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
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
