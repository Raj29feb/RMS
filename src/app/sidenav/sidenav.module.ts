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
        path: '',
        redirectTo: 'restaurants',
        pathMatch: 'full',
      },
      {
        path: 'restaurants',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../restaurants/restaurant.module').then(
            (m) => m.RestaurantModule
          ),
      },
      {
        path: 'dishes',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../dishes/dishes.module').then((m) => m.DishesModule),
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
