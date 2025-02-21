import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SentencePipe } from '../sentence.pipe';
import { AddressModalComponent } from './components/address-modal/address-modal.component';
import { AddressModalModule } from './components/address-modal/address-modal.module';
import { ReactiveFormsModule } from '@angular/forms';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule,
];
const CUSTOM_PIPES = [SentencePipe];

const FORM_MODULE = [ReactiveFormsModule];

@NgModule({
  declarations: [CUSTOM_PIPES],
  imports: [CommonModule, ...MATERIAL_MODULES, ...FORM_MODULE],
  exports: [...MATERIAL_MODULES, ...CUSTOM_PIPES, ...FORM_MODULE],
})
export class SdkModule {}
