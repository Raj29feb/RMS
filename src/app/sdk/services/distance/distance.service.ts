import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {
  constructor(private http: HttpClient) {}

  getDistances$(): Observable<any> {
    return this.http.get(`${enviroment.base_url}/distances`);
  }
}
