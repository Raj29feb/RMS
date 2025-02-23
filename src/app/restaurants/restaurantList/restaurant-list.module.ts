import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant-list.component';
import { RouterModule } from '@angular/router';
import { SentencePipe } from '../../sentence.pipe';
import { SdkModule } from '../../sdk/sdk.module';
import { RestaurantListRoutingModule } from './restaurant-routing-list.module';
import { RestaurantDetailsModule } from '../restaurant-details/restaurant-details.module';

@NgModule({
  declarations: [RestaurantComponent],
  imports: [
    CommonModule,
    SdkModule,
    RestaurantListRoutingModule,
    RestaurantDetailsModule,
  ],
  exports: [RestaurantComponent],
})
export class RestaurantModule {}
