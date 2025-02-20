import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SdkModule } from '../../sdk.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, MatDialogModule, SdkModule],
})
export class ModalModule {}
