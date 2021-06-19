import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherServiceService {
  constructor(private httpclient: HttpClient) {}

  getLocation(location) {
    return this.httpclient.get<any>(`/api/location/search/?query=${location}`);
  }

  getLocationDetails(woeid) {
    return this.httpclient.get<any>(`/api/location/${woeid}/`);
  }
}
