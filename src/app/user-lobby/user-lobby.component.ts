import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressModalComponent } from '../sdk/components/address-modal/address-modal.component';
import { ApiService } from '../api.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-user-lobby',
  templateUrl: './user-lobby.component.html',
  styleUrls: ['./user-lobby.component.scss'],
})
export class UserLobbyComponent implements OnInit {
  title = 'address';
  addAddressBtn = 'add address';
  noLocation = 'no location found';
  addresses = [{}];

  constructor(
    private dailog: MatDialog,
    private api: ApiService,
    private snackbar: SnackbarService
  ) {
    this.api.getAddresses().subscribe({
      next: (value) => {
        this.addresses = value;
      },
      error: (err) => {
        this.snackbar.openSnackBar(true, err.message);
      },
    });
  }
  ngOnInit(): void {}

  handleAddress() {
    const dialogRef = this.dailog.open(AddressModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the form data here
        this.api.createAddress(result.addresses).subscribe({
          next: (response: any) => {
            response.subscribe({
              next: (address: any) => {
                this.addresses = address;
              },
              error: (err: any) => {
                this.snackbar.openSnackBar(true, err.message);
              },
            });
          },
          error: (err) => {
            this.snackbar.openSnackBar(true, err.message);
          },
        });
      }
    });
  }
}
