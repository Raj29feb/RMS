import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SnackbarService } from '../../sdk/services/snackbar/snackbar.service';
import { DishesModalComponent } from '../../sdk/components/modal/dishes-modal/dishes-modal.component';

import { map, pipe, Subject, take, takeUntil, tap } from 'rxjs';

import { RestaurantService } from 'src/app/sdk/services/restaurant/restaurant.service';
import { DishService } from 'src/app/sdk/services/dish/dish.service';
import { Dish } from 'src/app/sdk/interfaces/dish.interface';
import { RestaurantNames } from 'src/app/sdk/interfaces/restaurant.interface';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnDestroy {
  title = 'dishes';
  editBtn = 'Edit';
  deleteBtn = 'delete';
  addDishesBtn = 'add dishes';
  restaurantNames$$ = new Subject();
  noDishes = 'no dish found';
  dishes: Dish[] = [];
  displayedColumns: string[] = ['position', 'name', 'restaurant', 'action'];
  restaurants: RestaurantNames[] = [];
  filter = 'all';
  private unsubscribe$$ = new Subject();

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private dailog: MatDialog,
    private ds: DishService,
    private rs: RestaurantService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.ds
      .getDishes$('all')
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe({
        next: (value) => {
          this.dishes = value;
        },
        error: (err) => {
          this.snackbar.openSnackBar(true, err.error.message);
          if (err.status === 403) {
            this.router.navigate(['/auth/login']);
            localStorage.clear();
          }
        },
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$$.next(null);
    this.unsubscribe$$.complete();
  }

  ngOnInit(): void {
    this.getRestaurantsNames('all');
    this.restaurantNames$$
      .pipe(take(1), pipe(takeUntil(this.unsubscribe$$)))
      .subscribe((res: any) => {
        res.unshift({ restaurantName: 'self', _id: 'self' });
        res.unshift({ restaurantName: 'all', _id: 'all' });
        this.restaurants = res;
      });
  }

  handleAddDishes() {
    this.getRestaurantsNames('specific');
    this.restaurantNames$$
      .pipe(take(1), takeUntil(this.unsubscribe$$))
      .subscribe((res) => {
        const restaurantNames = res;

        const dialogRef = this.dailog.open(DishesModalComponent, {
          data: { restaurantNames },
        });

        dialogRef
          .afterClosed()
          .pipe(takeUntil(this.unsubscribe$$))
          .subscribe((result) => {
            if (result) {
              this.ds
                .createDishes$(result.dishes)
                .pipe(
                  takeUntil(this.unsubscribe$$),
                  tap((response: any) => {
                    this.snackbar.openSnackBar(false, response.message);
                  }),
                  map(() => {
                    return this.ds.getDishes$('all');
                  })
                )
                .subscribe({
                  next: (response: any) => {
                    response.pipe(takeUntil(this.unsubscribe$$)).subscribe({
                      next: (dishes: any) => {
                        this.dishes = dishes;
                      },
                      error: (err: any) => {
                        this.snackbar.openSnackBar(true, err.error.message);
                        if (err.status === 403) {
                          this.router.navigate(['/auth/login']);
                          localStorage.clear();
                        }
                      },
                    });
                  },
                  error: (err) => {
                    this.snackbar.openSnackBar(true, err.error.message);
                    if (err.status === 403) {
                      this.router.navigate(['/auth/login']);
                      localStorage.clear();
                    }
                  },
                });
            }
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
            this.router.navigate(['/auth/login']);
            localStorage.clear();
          }
        },
      });
  }

  selectRestaurant(restaurantId: string, restaurantName: string) {
    this.ds
      .getDishes$(restaurantId)
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe({
        next: (value) => {
          this.dishes = value;
          this.filter = restaurantName;
        },
        error: (err) => {
          this.snackbar.openSnackBar(true, err.error.message);
          if (err.status === 403) {
            this.router.navigate(['/auth/login']);
            localStorage.clear();
          }
        },
      });
  }

  view(id: String) {
    this.router.navigate([`dishes/${id}`]);
  }
}
