import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantDetailsComponent } from './restaurant-details.component';
import { SdkModule } from '../../sdk/sdk.module';

const routes: Routes = [
  {
    path: '', // Default route for this module (empty path because the parent module will specify the path)
    component: RestaurantDetailsComponent,
  },
];

@NgModule({
  declarations: [RestaurantDetailsComponent],
  imports: [CommonModule, SdkModule, RouterModule.forChild(routes)],
})
export class RestaurantDetailsRoutingModule {}
