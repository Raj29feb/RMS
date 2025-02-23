import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishesComponent } from './dishes.component';
import { RouterModule, Routes } from '@angular/router';
import { SdkModule } from '../../sdk/sdk.module';
import { DishDetailsComponent } from '../dish-details/dish-details.component';

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
  exports: [RouterModule],
})
export class DishesRoutingModule {}
