import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SentencePipe } from '../sentence.pipe';
import { AddressModalComponent } from './components/modal/address-modal/address-modal.component';
import { AddressModalModule } from './components/modal/address-modal/address-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageBreadcrumComponent } from './components/page-breadcrum/page-breadcrum.component';
import { DishesModalComponent } from './components/modal/dishes-modal/dishes-modal.component';
import { MatRadioModule } from '@angular/material/radio';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule,
  MatTableModule,
  MatIconModule,
  MatRadioModule,
];
const CUSTOM_PIPES = [SentencePipe];

const SHARED_COMPONENTS = [PageBreadcrumComponent];

const FORM_MODULE = [ReactiveFormsModule];

@NgModule({
  declarations: [CUSTOM_PIPES, ...SHARED_COMPONENTS],
  imports: [CommonModule, ...MATERIAL_MODULES, ...FORM_MODULE],
  exports: [
    ...MATERIAL_MODULES,
    ...CUSTOM_PIPES,
    ...FORM_MODULE,
    ...SHARED_COMPONENTS,
  ],
})
export class SdkModule {}
