import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
})
export class AddressModalComponent {
  addressForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackbar: SnackbarService,
    private dailogRef: MatDialogRef<AddressModalComponent>
  ) {}
  ngOnInit(): void {
    // Initialize the form with one address field by default
    this.addressForm = this.fb.group({
      addresses: this.fb.array([this.createRestaurant()]),
    });
  }
  // Function to create address form group
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
  // Getter for addresses form array
  get addresses(): FormArray {
    return this.addressForm.get('addresses') as FormArray;
  }

  // Function to add a new address
  addAddress(): void {
    this.addresses.push(this.createRestaurant());
  }

  // Function to remove an address
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

  // Submit the form
  onSubmit(): void {
    this.addressForm.value.addresses.map((address: any) => {
      let { latitude, longitude } = this.generateRandomLocation();
      address.latitude = latitude;
      address.longitude = longitude;
      return address;
    });

    this.dailogRef.close(this.addressForm.value);
  }
}
