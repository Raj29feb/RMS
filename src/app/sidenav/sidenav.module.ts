import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { SidenavRoutingModule } from './sidenav-routing.module';
import { SdkModule } from '../sdk/sdk.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LogoModule } from '../logo/logo.module';
import { UserLobbyModule } from '../user-lobby/user-lobby.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    SdkModule,
    SidenavRoutingModule,
    MatSidenavModule,
    LogoModule,
    UserLobbyModule,
  ],
  exports: [SidenavComponent],
})
export class SidenavModule {}
