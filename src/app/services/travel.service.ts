import { Injectable } from '@angular/core';
import { Travel } from 'src/app/models/travel.model';
import { TRAVELS } from 'src/app/models/travels';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor() { }

  getTravels(): Observable<Travel[]> {
    const travels = of(TRAVELS);
    return travels;
  }
}
