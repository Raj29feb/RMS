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
import { AuthService } from 'src/app/sdk/services/auth/auth.service';
import { UserService } from 'src/app/sdk/services/user/user.service';
import { CartService } from 'src/app/sdk/services/cart/cart.service';

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
  permission$$ = new Subject();
  showAddCart = false;
  private unsubscribe$$ = new Subject();

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private dailog: MatDialog,
    private ds: DishService,
    private rs: RestaurantService,
    private snackbar: SnackbarService,
    private router: Router,
    private user: UserService,
    private cart: CartService
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
        this.restaurants = res;
      });
    this.user
      .checkRole$()
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe({
        next: (res) => {
          this.permission$$.next(res.role === 'admin' ? true : false);
          this.showAddCart = res.role === 'admin' ? false : true;
        },
        error: (err) => {
          this.snackbar.openSnackBar(true, err.error.message);
        },
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
                      },
                    });
                  },
                  error: (err) => {
                    this.snackbar.openSnackBar(true, err.error.message);
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
        },
      });
  }

  view(id: String) {
    this.router.navigate([`dishes/${id}`]);
  }
  addToCart(dish: Dish) {
    const { restaurantId, _id } = dish;
    const body = {
      restaurantId: restaurantId,
      dishId: _id,
    };
    console.log('body::', body);
    this.cart.addToCart$(body).subscribe({
      next: (result) => {
        this.cart.itemAdded$$.next(true);
        this.snackbar.openSnackBar(false, result.message);
      },
      error: (err) => {
        this.snackbar.openSnackBar(true, err.error.message);
      },
    });
  }
}
