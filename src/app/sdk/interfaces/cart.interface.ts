import { Dish } from './dish.interface';

export interface CartItem {
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  dishId: Dish;
  dishName: string;
  itemTotal: number;
  _id: string;
}

export interface Cart {
  _id: string;
  items: CartItem[];
  totalAmount: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface getCartResponse {
  data: Cart;
}

export interface editedCartData {
  itemId: string;
  quantity: number;
}
