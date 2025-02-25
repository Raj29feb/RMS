import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { DishModalComponent } from 'src/app/sdk/components/modal/dish-modal/dish-modal.component';
import { checkDishOwner } from 'src/app/sdk/interfaces/dish.interface';

import { DishService } from 'src/app/sdk/services/dish/dish.service';
import { RestaurantService } from 'src/app/sdk/services/restaurant/restaurant.service';
import { SnackbarService } from 'src/app/sdk/services/snackbar/snackbar.service';

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
  constructor(
    private dailog: MatDialog,
    private router: ActivatedRoute,
    private rs: RestaurantService,
    private route: Router,
    private ds: DishService,
    private snackbar: SnackbarService
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$$.next(null);
    this.unsubscribe$$.complete();
  }
  ngOnInit(): void {
    this.getRestaurantsNames('all');

    this.router.paramMap
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((params) => {
        const dishId = params.get('dishId');
        this.ds
          .getDish$(dishId as string)
          .pipe(
            tap(() =>
              this.ds
                .checkDish$(dishId as string)
                .pipe(takeUntil(this.unsubscribe$$))
                .subscribe({
                  next: (result) => {
                    const data = result as checkDishOwner;
                    this.dishOwner$$.next(data.owner);
                  },
                  error: (err) => {
                    this.dishOwner$$.next(err.error.owner);
                    if (err.status === 403) {
                      this.route.navigate(['login']);
                      localStorage.clear();
                    }
                  },
                })
            ),
            takeUntil(this.unsubscribe$$)
          )
          .subscribe({
            next: (res) => {
              this.dish = res.data;
            },
            error: (err) => {
              this.snackbar.openSnackBar(true, err.error.message);
              if (err.status === 403) {
                this.route.navigate(['login']);
                localStorage.clear();
              }
            },
          });
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
          if (err.status === 403) {
            this.route.navigate(['login']);
            localStorage.clear();
          }
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
                .pipe(takeUntil(this.unsubscribe$$))
                .subscribe({
                  next: (response: any) => {
                    response.pipe(takeUntil(this.unsubscribe$$)).subscribe({
                      next: (dish: any) => {
                        this.dish = dish.data;
                      },
                      error: (err: any) => {
                        this.snackbar.openSnackBar(true, err.error.message);
                        if (err.status === 403) {
                          this.route.navigate(['login']);
                          localStorage.clear();
                        }
                      },
                    });
                  },
                  error: (err: any) => {
                    this.snackbar.openSnackBar(true, err.error.message);
                    if (err.status === 403) {
                      this.route.navigate(['login']);
                      localStorage.clear();
                    }
                  },
                });
            }
          });
      });
  }
  handleDelete() {
    console.log('Handle delete is working');
  }
}
