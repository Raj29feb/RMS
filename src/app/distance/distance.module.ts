import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DistanceComponent } from './distance.component';

import { SdkModule } from '../sdk/sdk.module';

const routes: Routes = [
  {
    path: '',
    component: DistanceComponent,
  },
];

@NgModule({
  declarations: [DistanceComponent],
  imports: [CommonModule, SdkModule, RouterModule.forChild(routes)],
})
export class DistanceModule {}
