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
export interface DishData {
  data: Dish[];
}
export interface checkDishOwner {
  owner: boolean;
}
export interface DeleteDish {
  message: string;
}
export interface updateDishResponse {
  message: string;
}
