import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { RestaurantComponent } from '../restaurants/restaurantList/restaurant-list.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: '',
        redirectTo: 'restaurants',
        pathMatch: 'full',
      },
      {
        path: 'restaurants',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../restaurants/restaurantList/restaurant-list.module').then(
            (m) => m.RestaurantModule
          ),
      },
      {
        path: 'dishes',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../dishes/dishList/dishes.module').then(
            (m) => m.DishesModule
          ),
      },
      {
        path: 'distances',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../distance/distance.module').then((m) => m.DistanceModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidenavRoutingModule {}
