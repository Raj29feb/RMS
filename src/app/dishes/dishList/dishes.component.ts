import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SnackbarService } from '../../sdk/services/snackbar/snackbar.service';
import { DishesModalComponent } from '../../sdk/components/modal/dishes-modal/dishes-modal.component';

import { Subject, take } from 'rxjs';

import { RestaurantService } from 'src/app/sdk/services/restaurant/restaurant.service';
import { DishService } from 'src/app/sdk/services/dish/dish.service';
import { Dish } from 'src/app/sdk/interfaces/dish.interface';
import { RestaurantNames } from 'src/app/sdk/interfaces/restaurant.interface';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent {
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

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private dailog: MatDialog,
    private ds: DishService,
    private rs: RestaurantService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.ds.getDishes$('all').subscribe({
      next: (value) => {
        this.dishes = value;
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

  ngOnInit(): void {
    this.getRestaurantsNames('all');
    this.restaurantNames$$.pipe(take(1)).subscribe((res: any) => {
      res.unshift({ restaurantName: 'self', _id: 'self' });
      res.unshift({ restaurantName: 'all', _id: 'all' });
      this.restaurants = res;
    });
  }

  handleAddDishes() {
    this.getRestaurantsNames('specific');
    this.restaurantNames$$.pipe(take(1)).subscribe((res) => {
      const restaurantNames = res;

      const dialogRef = this.dailog.open(DishesModalComponent, {
        data: { restaurantNames },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.ds.createDishes$(result.dishes).subscribe({
            next: (response: any) => {
              response.subscribe({
                next: (dishes: any) => {
                  this.dishes = dishes;
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
    });
  }

  getRestaurantsNames(filter: string) {
    this.rs.getRestaurantsNames$(filter).subscribe({
      next: (response: any) => this.restaurantNames$$.next(response.data),
      error: (err) => {
        this.snackbar.openSnackBar(true, err.error.message);
        if (err.status === 403) {
          this.router.navigate(['login']);
          localStorage.clear();
        }
      },
    });
  }

  selectRestaurant(restaurantId: string, restaurantName: string) {
    this.ds.getDishes$(restaurantId).subscribe({
      next: (value) => {
        this.dishes = value;
        this.filter = restaurantName;
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
    this.router.navigate([`dishes/${id}`]);
  }
}
