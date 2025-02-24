import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressModalComponent } from '../../sdk/components/modal/address-modal/address-modal.component';
import { ApiService } from '../../api.service';
import { SnackbarService } from '../../snackbar.service';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

interface Restaurant {
  _id: string;
  userId: string;
  owner: string;
  restaurantName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  __v: number;
}

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
  restaurants: Restaurant[] = [];
  owners = new Set<string>();
  filter = 'all';

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private dailog: MatDialog,
    private api: ApiService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.api.getRestaurants('all').subscribe({
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
        this.api.createRestaurant(result.addresses).subscribe({
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
    this.api.getRestaurants(owner).subscribe({
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
