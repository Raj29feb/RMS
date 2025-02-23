import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { SnackbarService } from 'src/app/snackbar.service';

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
export class DishDetailsComponent {
  title = 'dish details';
  dish!: Dish;
  editBtn = 'Edit';
  deleteBtn = 'delete';
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private api: ApiService,
    private snackbar: SnackbarService
  ) {}
  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      const dishId = params.get('dishId');
      console.log('Dish id :: ', dishId);
      this.api.getDish(dishId as string).subscribe({
        next: (res) => {
          console.log('response from single dish api :: ', res);
          this.dish = res.data;
        },
        error: (err) => {
          console.log(err);
          this.snackbar.openSnackBar(true, err.error.message);
          if (err.status === 403) {
            this.route.navigate(['login']);
            localStorage.clear();
          }
        },
      });
    });
  }
  handleEdit() {
    console.log('Handle edit is working');
  }
  handleDelete() {
    console.log('Handle delete is working');
  }
}
