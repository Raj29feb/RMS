import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { AddressModalComponent } from '../../sdk/components/modal/address-modal/address-modal.component';
import { SnackbarService } from '../../sdk/services/snackbar/snackbar.service';
import { RestaurantService } from 'src/app/sdk/services/restaurant/restaurant.service';
import { RestaurantData } from 'src/app/sdk/interfaces/restaurant.interface';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantComponent implements OnInit {
  title = 'Restaurants';
  addAddressBtn = 'add restaurants';
  noLocation = 'no location found';
  addresses = [{}];
  displayedColumns: string[] = ['position', 'name', 'owner', 'action'];
  restaurants: RestaurantData[] = [];
  owners = new Set<string>();
  filter = 'all';

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private dailog: MatDialog,
    private rs: RestaurantService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.rs.getRestaurants$('all').subscribe({
      next: (value) => {
        this.addresses = [...value];
        value.unshift({ owner: 'self', _id: 'self' });
        value.unshift({ owner: 'all', _id: 'all' });
        this.restaurants = value;
        this.restaurants.forEach((restaurant) =>
          this.owners.add(restaurant.owner)
        );
      },
      error: (err) => {
        this.snackbar.openSnackBar(true, err.error.message);
        if (err.status === 403) {
          //place it in interceptor it self
          this.router.navigate(['login']);
          localStorage.clear();
        }
      },
    });
  }

  ngOnInit(): void {}

  handleAddress() {
    const dialogRef = this.dailog.open(AddressModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the form data here
        this.rs.createRestaurant$(result.addresses).subscribe({
          next: (response: any) => {
            response.subscribe({
              next: (address: any) => {
                this.addresses = address;
              },
              error: (err: any) => {
                this.snackbar.openSnackBar(true, err.error.message);
                if (err.status === 403) {
                  this.router.navigate(['login']);
                  localStorage.clear();
                }
              },
            });
          },
          error: (err) => {
            this.snackbar.openSnackBar(true, err.error.message);
            if (err.status === 403) {
              this.router.navigate(['login']);
              localStorage.clear();
            }
          },
        });
      }
    });
  }

  selectOwner(owner: string) {
    this.rs.getRestaurants$(owner).subscribe({
      next: (value) => {
        this.filter = owner;
        this.addresses = value;
      },
      error: (err) => {
        this.snackbar.openSnackBar(true, err.error.message);
        if (err.status === 403) {
          this.router.navigate(['login']);
          localStorage.clear();
        }
      },
    });
  }

  view(id: String) {
    this.router.navigate([`restaurants/${id}`]);
  }
}
