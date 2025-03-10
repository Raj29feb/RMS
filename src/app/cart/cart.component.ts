import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../sdk/services/cart/cart.service';
import { SnackbarService } from '../sdk/services/snackbar/snackbar.service';
import {
  Cart,
  CartItem,
  editedCartData,
  getCartResponse,
} from '../sdk/interfaces/cart.interface';
import { debounceTime, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { DishService } from '../sdk/services/dish/dish.service';
import { RestaurantService } from '../sdk/services/restaurant/restaurant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  title = 'cart';
  body$$ = new Subject<object>();
  items$$ = new Subject<CartItem[]>();
  subTotal$$ = new Subject<number>();
  itemQuantity$$ = new Subject<object>();
  editedCartData: editedCartData[] = [];
  cartData!: Cart;
  private unsubscribe$$ = new Subject();

  constructor(
    private cartService: CartService,
    private snackbar: SnackbarService,
    private dishService: DishService,
    private restaurantService: RestaurantService
  ) {
    // You can subscribe to itemQuantity$$ outside of the handleCart method
    this.itemQuantity$$
      .pipe(
        debounceTime(2000), // Wait 1 second after the last emission before processing
        tap((params) => console.log('params:', params))
      )
      .subscribe((result) => {
        console.log('Result:', result);
      });
  }
  ngOnInit(): void {
    this.getCartData();
    this.body$$
      .pipe(
        debounceTime(1000),
        takeUntil(this.unsubscribe$$),
        switchMap((body) => {
          return this.cartService.updateCart$(body).pipe(
            tap(() => this.getCartData()),
            takeUntil(this.unsubscribe$$)
          );
        })
      )
      .subscribe({
        next: (result) => {
          this.snackbar.openSnackBar(false, result.message);
        },
        error: (err) => {
          // Handle error response
          this.snackbar.openSnackBar(true, err.error.message);
        },
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$$.next(null);
    this.unsubscribe$$.complete();
  }
  getCartData() {
    this.cartService.getCartData$().subscribe({
      next: (result) => {
        // console.log('result from cartService api::', result.data);
        this.subTotal$$.next(result.data.totalAmount);
        this.items$$.next(result.data.items);
        this.cartData = result.data;
      },
      error: (err) => {
        this.snackbar.openSnackBar(true, err.error.message);
      },
    });
  }

  handleRemoveItem(itemId: string) {
    console.log('item id::', itemId);
    this.cartService
      .removeItem$(itemId)
      .pipe(
        tap(() => {
          this.getCartData();
        })
      )
      .subscribe({
        next: (result) => {
          this.snackbar.openSnackBar(false, result.message);
          this.cartService.itemAdded$$.next(true);
        },
        error: (err) => {
          this.snackbar.openSnackBar(true, err.error.message);
        },
      });
  }

  handleCart(quantity: number, itemId: string) {
    console.log(quantity, typeof quantity);
    console.log(itemId, typeof itemId);
    let subtotal = 0;
    this.cartData.items.map((item) => {
      if (item._id === itemId) {
        item.quantity = quantity;
        item.itemTotal = item.price * item.quantity;
      }
      subtotal += item.itemTotal;
      return item;
    });
    this.items$$.next(this.cartData.items);
    this.subTotal$$.next(subtotal);
    this.cartData.totalAmount = subtotal;
    console.log('this is my cart data::', this.cartData);
    const body = {
      items: this.cartData.items,
      totalAmount: this.cartData.totalAmount,
    };
    this.body$$.next(body);
  }
}
