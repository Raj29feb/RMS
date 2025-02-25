import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { SdkModule } from '../sdk/sdk.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LogoModule } from '../logo/logo.module';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../sdk/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
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
    ],
  },
];

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    SdkModule,
    MatSidenavModule,
    LogoModule,
    RouterModule.forChild(routes),
  ],
})
export class SidenavModule {}
