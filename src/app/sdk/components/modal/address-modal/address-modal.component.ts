import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
})
export class AddressModalComponent {
  addressForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dailogRef: MatDialogRef<AddressModalComponent>
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      addresses: this.fb.array([this.createRestaurant()]),
    });
  }

  createRestaurant(): FormGroup {
    return this.fb.group({
      restaurantName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      latitude: [''],
      longitude: [''],
    });
  }
  get addresses(): FormArray {
    return this.addressForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(this.createRestaurant());
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  generateRandomLocation() {
    // Generate random latitude between -90 and 90
    const latitude = (Math.random() * 180 - 90).toFixed(6); // Fixed to 6 decimal places

    // Generate random longitude between -180 and 180
    const longitude = (Math.random() * 360 - 180).toFixed(6); // Fixed to 6 decimal places

    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
  }

  onSubmit(): void {
    //use the spread operator
    //dont change the orignal array
    this.addressForm.value.addresses.map((address: any) => {
      let { latitude, longitude } = this.generateRandomLocation();
      address.latitude = latitude;
      address.longitude = longitude;
      return address;
    });
    this.dailogRef.close(this.addressForm.value);
  }
}
