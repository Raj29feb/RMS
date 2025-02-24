import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dishes-modal',
  templateUrl: './dishes-modal.component.html',
  styleUrls: [
    './dishes-modal.component.scss',
    '../dishes-modal/dishes-modal.component.scss',
  ],
})
export class DishesModalComponent {
  dishesForm!: FormGroup;
  menuOpened = false;
  categories = ['Appetizer', 'Main Course', 'Dessert', 'Drink', 'Side Dish'];
  restaurantNames: Array<{ restaurantName: string; _id: string }> | null = null;
  selectedRestaurant: string = '';
  constructor(
    private fb: FormBuilder,
    private dailogRef: MatDialogRef<DishesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('data:', this.data);
    this.restaurantNames = this.data.restaurantNames;
    this.dishesForm = this.fb.group({
      dishes: this.fb.array([this.createDishes()]),
    });
  }

  createDishes(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      restaurantName: ['', Validators.required],
      restaurantId: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      category: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
      isVegetarian: [false],
      isVegan: [false],
      image: [''],
      available: [false],
    });
  }

  get dishes(): FormArray {
    return this.dishesForm.get('dishes') as FormArray;
  }

  addDishes(): void {
    this.dishes.push(this.createDishes());
  }

  addIngredient(dishIndex: number): void {
    const ingredients = this.getIngredients(dishIndex);
    ingredients.push(this.fb.control('', Validators.required));
  }

  getIngredients(index: number): FormArray {
    return this.dishes.controls[index].get('ingredients') as FormArray;
  }

  removeDishes(index: number): void {
    this.dishes.removeAt(index);
  }

  removeIngredient(dishIndex: number, ingredientIndex: number): void {
    const ingredients = this.getIngredients(dishIndex);
    ingredients.removeAt(ingredientIndex);
  }

  selectRestaurant(restaurant: any, dishIndex: number): void {
    const dishForm = this.dishes.at(dishIndex);
    const restaurantNameControl = dishForm.get('restaurantName');
    const restaurantIdControl = dishForm.get('restaurantId');

    restaurantIdControl?.setValue(restaurant._id);

    // Set the value of the restaurant and mark the control as touched
    restaurantNameControl?.setValue(restaurant.restaurantName);
    restaurantNameControl?.markAsTouched(); // Manually mark it as touched

    // Optionally, you can also set it as dirty if you want
    restaurantNameControl?.markAsDirty();
  }

  selectCategory(category: any, dishIndex: number): void {
    const dishForm = this.dishes.at(dishIndex);
    const categoryControl = dishForm.get('category');
    // Set the value of the restaurant and mark the control as touched
    categoryControl?.setValue(category);
  }

  openedMenu() {
    this.menuOpened = true;
  }

  onSubmit(): void {
    this.dailogRef.close(this.dishesForm.value);
  }
}
