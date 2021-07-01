import { Injectable } from '@angular/core';
import { Travel } from 'src/app/models/travel.model';
import { TRAVELS } from 'src/app/models/travels';
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
  weatherApiKey = 'c715deaeb2ad3ceff9248d6dc8132fe3';

  constructor(
    private http: HttpClient
  ) { }

  getTravels(): Observable<Travel[]> {
    const travels = of(TRAVELS);
    return travels;
  }

  getCurrentWeather(city?: string) {
    return this.http.get(this.weatherUrl + city + '&APPID=' + this.weatherApiKey);
  }
}
