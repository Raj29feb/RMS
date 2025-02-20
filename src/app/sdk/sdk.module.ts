import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SentencePipe } from '../sentence.pipe';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatDialogModule,
];
const CUSTOM_PIPES = [SentencePipe];

@NgModule({
  declarations: [CUSTOM_PIPES],
  imports: [CommonModule, ...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES, ...CUSTOM_PIPES],
})
export class SdkModule {}
