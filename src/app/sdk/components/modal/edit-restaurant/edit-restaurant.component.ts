import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: [
    '../address-modal/address-modal.component.scss',
    './edit-restaurant.component.scss',
  ],
})
export class EditRestaurantComponent {
  addressForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dailogRef: MatDialogRef<EditRestaurantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      restaurantName: [this.data.restaurantName, Validators.required],
      addressLine1: [this.data.addressLine1, Validators.required],
      addressLine2: [this.data.addressLine2],
      city: [this.data.city, Validators.required],
      state: [this.data.state, Validators.required],
      zipCode: [this.data.zipCode, Validators.required],
      country: [this.data.country, Validators.required],
      latitude: [this.data.latitude],
      longitude: [this.data.longitude],
    });
  }

  onSubmit(): void {
    this.dailogRef.close(this.addressForm.value);
  }
}
