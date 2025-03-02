import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { AddressModalComponent } from '../../sdk/components/modal/address-modal/address-modal.component';
import { SnackbarService } from '../../sdk/services/snackbar/snackbar.service';
import { RestaurantService } from 'src/app/sdk/services/restaurant/restaurant.service';
import { RestaurantData } from 'src/app/sdk/interfaces/restaurant.interface';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/sdk/services/auth/auth.service';
import { UserService } from 'src/app/sdk/services/user/user.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantComponent implements OnInit, OnDestroy {
  title = 'Restaurants';
  addAddressBtn = 'add restaurants';
  permission$$ = new Subject();
  noLocation = 'no location found';
  addresses: Array<object> = [];
  displayedColumns: string[] = ['position', 'name', 'owner', 'action'];
  restaurants: RestaurantData[] = [];
  owners = new Set<string>();
  filter = 'all';
  private unsubscribe$$ = new Subject();

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private dailog: MatDialog,
    private rs: RestaurantService,
    private snackbar: SnackbarService,
    private router: Router,
    private user: UserService
  ) {
    this.rs
      .getRestaurants$('all')
      .pipe(
        takeUntil(this.unsubscribe$$),
        map((response: any) => response.data.reverse())
      )
      .subscribe({
        next: (value) => {
          this.addresses = [...value];
          this.restaurants = value;
          this.restaurants.forEach((restaurant) =>
            this.owners.add(restaurant.owner)
          );
        },
        error: (err) => {
          this.snackbar.openSnackBar(true, err.error.message);
        },
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$$.next(null);
    this.unsubscribe$$.complete();
  }

  ngOnInit(): void {
    this.user
      .checkRole$()
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe({
        next: (res) => {
          this.permission$$.next(res.role === 'admin' ? true : false);
        },
        error: (err) => {
          this.snackbar.openSnackBar(true, err.error.message);
        },
      });
  }

  handleAddress() {
    const dialogRef = this.dailog.open(AddressModalComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((result) => {
        if (result) {
          // Handle the form data here
          this.rs
            .createRestaurant$(result.addresses)
            .pipe(
              takeUntil(this.unsubscribe$$),
              tap((response: any) => {
                this.snackbar.openSnackBar(false, response.message);
              }),
              map(() => {
                return this.rs
                  .getRestaurants$('all')
                  .pipe(map((response) => response.data.reverse()));
              })
            )
            .subscribe({
              next: (response: any) => {
                response.pipe(takeUntil(this.unsubscribe$$)).subscribe({
                  next: (address: any) => {
                    this.addresses = address;
                  },
                  error: (err: any) => {
                    console.log('error::', err);
                    this.snackbar.openSnackBar(true, err.error.message);
                  },
                });
              },
              error: (err) => {
                this.snackbar.openSnackBar(true, err.error.message);
              },
            });
        }
      });
  }

  selectOwner(owner: string) {
    this.rs
      .getRestaurants$(owner)
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe({
        next: (value) => {
          this.filter = owner;
          this.addresses = value.data;
        },
        error: (err) => {
          this.snackbar.openSnackBar(true, err.error.message);
        },
      });
  }

  view(id: String) {
    this.router.navigate([`restaurants/${id}`]);
  }
}
