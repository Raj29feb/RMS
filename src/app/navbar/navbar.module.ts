import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoModule } from '../logo/logo.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, LogoModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
