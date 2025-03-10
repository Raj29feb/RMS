import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { ModalComponent } from 'src/app/sdk/components/modal/confirm-modal/modal.component';
import { DishModalComponent } from 'src/app/sdk/components/modal/dish-modal/dish-modal.component';
import { checkDishOwner } from 'src/app/sdk/interfaces/dish.interface';
import { AuthService } from 'src/app/sdk/services/auth/auth.service';

import { DishService } from 'src/app/sdk/services/dish/dish.service';
import { RestaurantService } from 'src/app/sdk/services/restaurant/restaurant.service';
import { SnackbarService } from 'src/app/sdk/services/snackbar/snackbar.service';
import { UserService } from 'src/app/sdk/services/user/user.service';

export interface Dish {
  _id: string;
  name: string;
  description: string;
  userId: string;
  restaurantName: string;
  price: number;
  category: string;
  ingredients: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  image: string;
  restaurantId: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss'],
})
export class DishDetailsComponent implements OnInit, OnDestroy {
  title = 'dish details';
  dish!: Dish;
  editBtn = 'Edit';
  deleteBtn = 'delete';
  dishOwner$$ = new Subject();
  restaurantNames$$ = new Subject();
  private unsubscribe$$ = new Subject();
  permission$$ = new Subject();
  constructor(
    private dailog: MatDialog,
    private router: ActivatedRoute,
    private rs: RestaurantService,
    private route: Router,
    private ds: DishService,
    private snackbar: SnackbarService,
    public auth: AuthService,
    private user: UserService
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$$.next(null);
    this.unsubscribe$$.complete();
  }
  ngOnInit(): void {
    this.getRestaurantsNames('all');

    this.router.paramMap
      .pipe(
        takeUntil(this.unsubscribe$$),
        switchMap((params) => {
          const dishId = params.get('dishId');
          return this.ds.getDish$(dishId as string).pipe(
            tap((res) => {
              this.dish = res.data;
            }),
            switchMap(() => this.ds.checkDish$(dishId as string))
          );
        })
      )
      .subscribe({
        next: (result) => {
          const data = result as checkDishOwner;
          this.dishOwner$$.next(data.owner);
        },
        error: (err) => {
          if (err.error.owner)
            this.snackbar.openSnackBar(true, err.error.message);
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
  getRestaurantsNames(filter: string) {
    this.rs
      .getRestaurantsNames$(filter)
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe({
        next: (response: any) => this.restaurantNames$$.next(response.data),
        error: (err) => {
          this.snackbar.openSnackBar(true, err.error.message);
        },
      });
  }
  handleEdit() {
    const dishId = this.route.url.split('/')[2];

    this.getRestaurantsNames('specific');
    this.restaurantNames$$
      .pipe(take(1), takeUntil(this.unsubscribe$$))
      .subscribe((res) => {
        const restaurantNames = res;

        const dialogRef = this.dailog.open(DishModalComponent, {
          data: { restaurantNames, dishId, restaurantDetails: this.dish },
        });

        dialogRef
          .afterClosed()
          .pipe(takeUntil(this.unsubscribe$$))
          .subscribe((result) => {
            if (result) {
              this.ds
                .updateDish$(dishId, result)
                .pipe(
                  takeUntil(this.unsubscribe$$),
                  tap((response: any) => {
                    this.snackbar.openSnackBar(false, response.message);
                  }),
                  map(() => {
                    return this.ds.getDish$(dishId);
                  })
                )
                .subscribe({
                  next: (response: any) => {
                    response.pipe(takeUntil(this.unsubscribe$$)).subscribe({
                      next: (dish: any) => {
                        this.dish = dish.data;
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
      });
  }
  handleDelete() {
    const dishId = this.route.url.split('/')[2];
    const dialogRef = this.dailog.open(ModalComponent, {
      data: 'are you sure you want to delete this dish ?',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((result) => {
        if (result) {
          this.ds
            .deleteDish$(dishId)
            .pipe(takeUntil(this.unsubscribe$$))
            .subscribe({
              next: (result) => {
                this.snackbar.openSnackBar(false, result.message);
                this.route.navigate(['dishes']);
              },
              error: (err) => {
                this.snackbar.openSnackBar(true, err.error.message);
              },
            });
        }
      });
  }
}
