import { Component, ViewChild } from '@angular/core';
import { SdkModule } from '../../sdk/sdk.module';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../api.service';
import { SnackbarService } from '../../snackbar.service';
import { Router } from '@angular/router';
import { DishesModalComponent } from '../../sdk/components/modal/dishes-modal/dishes-modal.component';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';

interface MenuItem {
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
interface restaurant {
  restaurantName: string;
  _id: string;
}

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
  dishes: MenuItem[] = [];
  displayedColumns: string[] = ['position', 'name', 'restaurant', 'action'];
  restaurants: restaurant[] = [];
  filter = 'all';

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private dailog: MatDialog,
    private api: ApiService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.api.getDishes('all').subscribe({
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
    // Subscribe to restaurantNames$$ to get the list of restaurant names
    this.getRestaurantsNames('specific'); // This will update the restaurantNames$$ BehaviorSubject
    this.restaurantNames$$.pipe(take(1)).subscribe((res) => {
      const restaurantNames = res; // Save the restaurant names in a variable

      console.log(restaurantNames); // Log the fetched data

      // After data is fetched, open the dialog and pass the restaurant names as data
      const dialogRef = this.dailog.open(DishesModalComponent, {
        data: { restaurantNames }, // Passing data to the dialog
      });

      // Handle the result after the dialog is closed
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('form data::', result);

          // Handle the form data here and create new dishes
          this.api.createDishes(result.dishes).subscribe({
            next: (response: any) => {
              response.subscribe({
                next: (dishes: any) => {
                  this.dishes = dishes; // Handle the response data
                },
                error: (err: any) => {
                  console.log(err);
                  this.snackbar.openSnackBar(true, err.error.message); // Handle error
                  if (err.status === 403) {
                    this.router.navigate(['login']);
                    localStorage.clear();
                  }
                },
              });
            },
            error: (err) => {
              this.snackbar.openSnackBar(true, err.error.message); // Handle error
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
    this.api.getRestaurantsNames(filter).subscribe({
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
    this.api.getDishes(restaurantId).subscribe({
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
