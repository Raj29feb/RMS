import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { SdkModule } from '../sdk/sdk.module';
import { LogoModule } from '../logo/logo.module';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { roleGuard } from '../sdk/guard/role/role.guard';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'restaurants',
        loadChildren: () =>
          import('../restaurants/restaurant.module').then(
            (m) => m.RestaurantModule
          ),
      },
      {
        path: 'dishes',
        loadChildren: () =>
          import('../dishes/dishes.module').then((m) => m.DishesModule),
      },
      {
        path: 'distances',
        loadChildren: () =>
          import('../distance/distance.module').then((m) => m.DistanceModule),
      },
      {
        path: 'cart',
        canActivate: [roleGuard],
        component: CartComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [CoreComponent],
  imports: [CommonModule, SdkModule, LogoModule, RouterModule.forChild(routes)],
})
export class CoreModule {}
