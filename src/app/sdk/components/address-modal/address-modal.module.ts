import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdkModule } from '../../sdk.module';
import { AddressModalComponent } from './address-modal.component';

@NgModule({
  declarations: [AddressModalComponent],
  imports: [CommonModule, SdkModule],
})
export class AddressModalModule {}
