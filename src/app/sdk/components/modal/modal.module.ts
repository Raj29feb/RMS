import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';

import { SdkModule } from '../../sdk.module';

import { ModalComponent } from './confirm-modal/modal.component';
import { DishesModalComponent } from './dishes-modal/dishes-modal.component';
import { AddressModalComponent } from './address-modal/address-modal.component';
import { DishModalComponent } from './dish-modal/dish-modal.component';

@NgModule({
  declarations: [ModalComponent, DishesModalComponent, AddressModalComponent, DishModalComponent],
  imports: [CommonModule, MatDialogModule, SdkModule],
})
export class ModalModule {}
