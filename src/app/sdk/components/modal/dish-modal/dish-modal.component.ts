import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Dish } from 'src/app/sdk/interfaces/dish.interface';

@Component({
  selector: 'app-dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: [
    './dish-modal.component.scss',
    '../dishes-modal/dishes-modal.component.scss',
  ],
})
export class DishModalComponent {
  dishForm!: FormGroup;
  restaurantNames: Array<{ restaurantName: string; _id: string }> | null = null;
  categories = ['Appetizer', 'Main Course', 'Dessert', 'Drink', 'Side Dish'];

  ngOnInit(): void {
    this.restaurantNames = this.data.restaurantNames;
    this.dishForm = this.fb.group({
      name: [this.data.restaurantDetails.name, Validators.required],
      restaurantName: [
        this.data.restaurantDetails.restaurantName,
        Validators.required,
      ],
      restaurantId: [
        this.data.restaurantDetails.restaurantId,
        Validators.required,
      ],
      description: [
        this.data.restaurantDetails.description,
        Validators.required,
      ],
      price: [this.data.restaurantDetails.price, Validators.required],
      category: [this.data.restaurantDetails.category, Validators.required],
      ingredients: this.fb.array(
        this.initializeIngredients(this.data.restaurantDetails)
      ),
      isVegetarian: [this.data.restaurantDetails.isVegetarian],
      isVegan: [this.data.restaurantDetails.isVegan],
      image: [this.data.restaurantDetails.image],
      available: [this.data.restaurantDetails.available],
    });
  }

  constructor(
    private fb: FormBuilder,
    private dailogRef: MatDialogRef<DishModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  initializeIngredients(data: Dish): FormControl<string>[] {
    return data.ingredients.map(
      (ingredient: string) =>
        this.fb.control(ingredient, Validators.required) as FormControl<string>
    );
  }
  getIngredients(): FormArray {
    return this.dishForm.get('ingredients') as FormArray;
  }
  removeIngredient(ingredientIndex: number): void {
    const ingredients = this.getIngredients();
    ingredients.removeAt(ingredientIndex);
  }
  addIngredient(): void {
    const ingredients = this.getIngredients();
    ingredients.push(this.fb.control('', Validators.required));
  }
  selectRestaurant(restaurant: any): void {
    const restaurantNameControl = this.dishForm.get('restaurantName');
    const restaurantIdControl = this.dishForm.get('restaurantId');

    restaurantIdControl?.setValue(restaurant._id);

    // Set the value of the restaurant and mark the control as touched
    restaurantNameControl?.setValue(restaurant.restaurantName);
    restaurantNameControl?.markAsTouched(); // Manually mark it as touched

    // Optionally, you can also set it as dirty if you want
    restaurantNameControl?.markAsDirty();
  }
  selectCategory(category: any): void {
    const categoryControl = this.dishForm.get('category');
    // Set the value of the restaurant and mark the control as touched
    categoryControl?.setValue(category);
  }
  onSubmit(): void {
    this.dailogRef.close(this.dishForm.value);
  }
}
