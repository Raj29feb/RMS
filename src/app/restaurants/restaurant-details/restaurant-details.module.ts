import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdkModule } from '../../sdk/sdk.module';
import { RestaurantDetailsComponent } from './restaurant-details.component';
import { RestaurantDetailsRoutingModule } from './restaurant-details-routing.module';

@NgModule({
  imports: [RestaurantDetailsRoutingModule],
})
export class RestaurantDetailsModule {}
