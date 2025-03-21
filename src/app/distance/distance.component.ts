import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

import { SnackbarService } from '../sdk/services/snackbar/snackbar.service';
import { DistanceService } from '../sdk/services/distance/distance.service';
import {
  Distance,
  DistanceResponse,
} from '../sdk/interfaces/distance.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.scss'],
})
export class DistanceComponent implements OnDestroy {
  title = 'Distances';
  noDistances = 'no distances found';
  distances: Distance[] = [];
  displayedColumns: string[] = ['position', 'name', 'distance'];
  private unsubscribe$$ = new Subject();
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private dt: DistanceService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.dt
      .getDistances$()
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe({
        next: (value) => {
          this.distances = value.data;
        },
        error: (err) => {
          this.snackbar.openSnackBar(true, err.error.message);
        },
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$$.next(null);
    this.unsubscribe$$.complete();
  }

  view(id: String) {
    this.router.navigate([`dishes/${id}`]);
  }
}
