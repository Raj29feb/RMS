import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackbarService } from '../../sdk/services/snackbar/snackbar.service';
import { RestaurantService } from 'src/app/sdk/services/restaurant/restaurant.service';
import { catchError, map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditRestaurantComponent } from 'src/app/sdk/components/modal/edit-restaurant/edit-restaurant.component';
import { ModalComponent } from 'src/app/sdk/components/modal/confirm-modal/modal.component';
import { checkRestaurantOwner } from 'src/app/sdk/interfaces/restaurant.interface';
import { AuthService } from 'src/app/sdk/services/auth/auth.service';
import { UserService } from 'src/app/sdk/services/user/user.service';

export interface Restaurant {
  _id: string;
  __v: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  restaurantName: string;
  state: string;
  userId: string;
  zipCode: string;
  owner: string;
}

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
  title = 'restaurants details';
  restaurant!: Restaurant;
  editBtn = 'Edit';
  deleteBtn = 'delete';
  private unsubscribe$$ = new Subject();
  permission$$ = new Subject();
  restaurantOwner$$ = new Subject();
  constructor(
    private router: ActivatedRoute,
    private rs: RestaurantService,
    private route: Router,
    private snackbar: SnackbarService,
    private dailog: MatDialog,
    public auth: AuthService,
    private user: UserService
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$$.next(null);
    this.unsubscribe$$.complete();
  }

  ngOnInit(): void {
    this.router.paramMap
      .pipe(
        takeUntil(this.unsubscribe$$),
        switchMap((params) => {
          const restaurantId = params.get('restaurantId');
          return this.rs.getRestaurant$(restaurantId as String).pipe(
            tap((res) => {
              this.restaurant = res;
            }),
            switchMap(() => this.rs.checkRestaurant$(restaurantId as string))
          );
        })
      )
      .subscribe({
        next: (result) => {
          console.log(result);
          const data = result as checkRestaurantOwner;
          this.restaurantOwner$$.next(data.owner);
        },
        error: (err) => {
          this.restaurantOwner$$.next(err.error.owner);
        },
      });

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

  handleEdit() {
    const restaurantId = this.route.url.split('/')[2];
    const dialogRef = this.dailog.open(EditRestaurantComponent, {
      data: this.restaurant,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((result) => {
        if (result) {
          this.rs
            .updateRestaurant$(restaurantId, result)
            .pipe(
              takeUntil(this.unsubscribe$$),
              tap((response: any) => {
                this.snackbar.openSnackBar(false, response.message);
              }),
              map(() => {
                return this.rs.getRestaurant$(restaurantId);
              })
            )
            .subscribe({
              next: (response: any) => {
                response.pipe(takeUntil(this.unsubscribe$$)).subscribe({
                  next: (restaurant: any) => {
                    this.restaurant = restaurant;
                  },
                  error: (err: any) => {
                    this.snackbar.openSnackBar(true, err.error.message);
                  },
                });
              },
              error: (err: any) => {
                this.snackbar.openSnackBar(true, err.error.message);
              },
            });
        }
      });
  }

  handleDelete() {
    const restaurantId = this.route.url.split('/')[2];
    const dialogRef = this.dailog.open(ModalComponent, {
      data: 'are you sure you want to delete this restaurant ?',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((result) => {
        if (result) {
          this.rs
            .deleteRestaurant$(restaurantId)
            .pipe(takeUntil(this.unsubscribe$$))
            .subscribe({
              next: (result) => {
                this.snackbar.openSnackBar(false, result.message);
                this.route.navigate(['restaurants']);
              },
              error: (err) => {
                this.snackbar.openSnackBar(true, err.error.message);
              },
            });
        }
      });
  }
}
