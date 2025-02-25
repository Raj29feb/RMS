export interface RestaurantData {
  _id: string;
  userId: string;
  owner: string;
  restaurantName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  __v: number;
}

export interface RestaurantNames {
  restaurantName: string;
  _id: string;
}
