import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.css'],
})
export class WeatherViewComponent implements OnInit {
  @Input() woeid: number;
  @Input() title: string;
  LocationInfo = [];

  humidityI = '../../assets/humidity.png';
  hotI = '../../assets/hot.png';
  coldI = '../../assets/cold.png';

  constructor(private WeatherServiceService: WeatherServiceService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.LocationInfo = [];
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.WeatherServiceService.getLocationDetails(this.woeid).subscribe(
      (data) => {
        this.LocationInfo = data.consolidated_weather;
        this.Icon();
      },
      (err) => alert('The data could not be retrieved')
    );
  }

  getDayName(date) {
    return new Date(date).toLocaleString('en-us', { weekday: 'long' });
  }

  getDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return day + '/' + month + '/' + year;
  }

  calcAverageTemp(info) {
    var aver = (info.min_temp + info.max_temp) / 2;
    return aver >= 23 ? this.hotI : this.coldI;
  }

  Icon() {
    this.LocationInfo = this.LocationInfo.slice(0, 3);
    for (var i in this.LocationInfo) {
      this.LocationInfo[
        i
      ].icon = `http://localhost:4200/static/img/weather/${this.LocationInfo[i].weather_state_abbr}.svg`;
    }
  }
}
