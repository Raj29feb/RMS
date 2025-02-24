import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}
  openSnackBar(status: boolean, message: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      data: {
        isErrorState: status,
        content: message,
      },
    });
  }
}
