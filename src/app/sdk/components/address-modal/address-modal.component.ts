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
      addresses: this.fb.array([this.createAddress()]),
    });
  }
  // Function to create address form group
  createAddress(): FormGroup {
    return this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
  // Getter for addresses form array
  get addresses(): FormArray {
    return this.addressForm.get('addresses') as FormArray;
  }

  // Function to add a new address
  addAddress(): void {
    this.addresses.push(this.createAddress());
  }

  // Function to remove an address
  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  // Submit the form
  onSubmit(): void {
    this.dailogRef.close(this.addressForm.value);
  }
}
