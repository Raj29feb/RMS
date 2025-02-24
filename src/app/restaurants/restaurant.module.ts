import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantComponent } from './restaurantList/restaurant-list.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';

import { SdkModule } from '../sdk/sdk.module';

const routes: Routes = [
  {
    path: '',
    component: RestaurantComponent,
  },
  {
    path: ':restaurantId',
    component: RestaurantDetailsComponent,
  },
];

@NgModule({
  declarations: [RestaurantComponent, RestaurantDetailsComponent],
  imports: [CommonModule, SdkModule, RouterModule.forChild(routes)],
})
export class RestaurantModule {}
