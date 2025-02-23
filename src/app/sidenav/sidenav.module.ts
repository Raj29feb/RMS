import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { SidenavRoutingModule } from './sidenav-routing.module';
import { SdkModule } from '../sdk/sdk.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LogoModule } from '../logo/logo.module';
import { RestaurantModule } from '../restaurants/restaurantList/restaurant-list.module';
import { DishesModule } from '../dishes/dishList/dishes.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    SdkModule,
    SidenavRoutingModule,
    MatSidenavModule,
    LogoModule,
  ],
  exports: [SidenavComponent],
})
export class SidenavModule {}
