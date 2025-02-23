import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './confirm-modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SdkModule } from '../../sdk.module';
import { DishesModalComponent } from './dishes-modal/dishes-modal.component';

@NgModule({
  declarations: [ModalComponent, DishesModalComponent],
  imports: [CommonModule, MatDialogModule, SdkModule],
})
export class ModalModule {}
