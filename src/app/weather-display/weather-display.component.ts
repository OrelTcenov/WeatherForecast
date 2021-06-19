import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { Subject } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css'],
})
export class WeatherDisplayComponent implements OnInit {
  keyword = 'title';
  cityInput = new Subject();
  cityVal;
  autoComplete: [];
  woeid: number;
  title: string;

  constructor(private WeatherServiceService: WeatherServiceService) {}

  ngOnInit(): void {
    this.cityInput
      .pipe(
        filter((data: string) => data.length > 0),
        switchMap((data: string) => {
          return this.WeatherServiceService.getLocation(data);
        })
      )
      .subscribe((option: []) => {
        this.autoComplete = option;
      });
  }

  selectEvent(item) {
    this.cityVal = item.title;
    this.woeid = item.woeid;
    this.title = item.title;
    this.autoComplete = null;
  }
}
