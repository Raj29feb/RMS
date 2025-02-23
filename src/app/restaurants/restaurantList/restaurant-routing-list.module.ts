import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from './restaurant-list.component';
import { RestaurantDetailsComponent } from '../restaurant-details/restaurant-details.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantComponent,
  },
  {
    path: ':restaurantId',
    loadChildren: () =>
      import('../restaurant-details/restaurant-details.module').then(
        (m) => m.RestaurantDetailsModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantListRoutingModule {}
