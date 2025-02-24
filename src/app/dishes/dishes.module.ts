import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishesComponent } from './dishList/dishes.component';

import { SdkModule } from '../sdk/sdk.module';

const routes: Routes = [
  {
    path: '',
    component: DishesComponent,
  },
  {
    path: ':dishId',
    component: DishDetailsComponent,
  },
];

@NgModule({
  declarations: [DishesComponent, DishDetailsComponent],
  imports: [CommonModule, SdkModule, RouterModule.forChild(routes)],
})
export class DishesModule {}
