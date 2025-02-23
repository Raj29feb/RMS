import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { SnackbarService } from '../snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.scss'],
})
export class DistanceComponent {
  title = 'Distances';
  // restaurantNames$$ = new Subject();
  noDistances = 'no distances found';
  distances = [];
  displayedColumns: string[] = ['position', 'name', 'distance'];

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private api: ApiService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.api.getDistances().subscribe({
      next: (value) => {
        this.distances = value.data;
      },
      error: (err) => {
        this.snackbar.openSnackBar(true, err.error.message);
        if (err.status === 403) {
          this.router.navigate(['login']);
          localStorage.clear();
        }
      },
    });
  }
  ngOnInit(): void {}

  view(id: String) {
    this.router.navigate([`dishes/${id}`]);
  }
}
