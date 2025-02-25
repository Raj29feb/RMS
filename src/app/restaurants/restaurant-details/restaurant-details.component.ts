import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackbarService } from '../../sdk/services/snackbar/snackbar.service';
import { RestaurantService } from 'src/app/sdk/services/restaurant/restaurant.service';

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
export class RestaurantDetailsComponent implements OnInit {
  title = 'restaurants details';
  restaurant!: Restaurant;
  editBtn = 'Edit';
  deleteBtn = 'delete';
  constructor(
    private router: ActivatedRoute,
    private rs: RestaurantService,
    private route: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      const restaurantId = params.get('restaurantId');
      this.rs.getRestaurant$(restaurantId as String).subscribe({
        next: (res) => {
          this.restaurant = res;
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

  handleEdit() {
    console.log('Handle edit is working');
  }

  handleDelete() {
    console.log('Handle delete is working');
  }
}
