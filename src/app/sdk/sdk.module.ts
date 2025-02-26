import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SentencePipe } from './pipes/sentence/sentence.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { PageBreadcrumComponent } from './components/page-breadcrum/page-breadcrum.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EditRestaurantComponent } from './components/modal/edit-restaurant/edit-restaurant.component';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatDialogModule,
  MatTableModule,
  MatRadioModule,
  MatSnackBarModule,
  MatSidenavModule,
];
const CUSTOM_PIPES = [SentencePipe];

const SHARED_COMPONENTS = [PageBreadcrumComponent, SnackbarComponent];

const FORM_MODULE = [ReactiveFormsModule];

@NgModule({
  declarations: [CUSTOM_PIPES, ...SHARED_COMPONENTS, EditRestaurantComponent],
  imports: [CommonModule, ...MATERIAL_MODULES, ...FORM_MODULE],
  exports: [
    ...MATERIAL_MODULES,
    ...CUSTOM_PIPES,
    ...FORM_MODULE,
    ...SHARED_COMPONENTS,
  ],
})
export class SdkModule {}
