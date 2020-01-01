import {Component, Input, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import { LocationService } from '../services/location.service';
import { StateSealService} from '../services/state-seal.service';

@Component({
  selector: 'app-current-tab',
  templateUrl: './current-tab.component.html',
  styleUrls: ['./current-tab.component.css']
})
export class CurrentTabComponent implements OnChanges {
  @Input() savedCity;
  @Input() currentData;
  @Input() savedState;
  @Input() dataLoaded;
  @Output() dataChanged = new EventEmitter<boolean>();

  searchEngineInfo: any;

  temperature: number;
  summary: string;
  timezone: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  visibility: number;
  cloudCover: number;
  ozone: number;

  degreeImage = 'https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_oval-512.png';
  humidityImage = 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-16-512.png';
  pressureImage = 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-25-512.png';
  windSpeedImage = 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png';
  visibilityImage = 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-30-512.png';
  cloudCoverImage = 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png';
  ozoneImage = 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-24-512.png';

  stateSealURL: string;
  private resultsAvailable: boolean;

  constructor(private locationService: LocationService,
              private stateSealService: StateSealService) {
  }

  ngOnChanges(): void {
    if (this.locationService.locationJSONObj) {
      this.locationService.locationJSONObj.subscribe( data => {
        // @ts-ignore
        if (data && data.currently) {
          // @ts-ignore
          this.temperature = data ? Math.round(data.currently.temperature) : null;
          // @ts-ignore
          this.timezone = data ? data.timezone : null;
          // @ts-ignore
          this.summary = data ? data.currently.summary : null;
          // @ts-ignore
          this.humidity = data ? data.currently.humidity : null;
          // @ts-ignore
          this.pressure = data ? data.currently.pressure : null;
          // @ts-ignore
          this.windSpeed = data ? data.currently.windSpeed : null;
          // @ts-ignore
          this.visibility = data ? data.currently.visibility : null;
          // @ts-ignore
          this.cloudCover = data ? data.currently.cloudCover : null;
          // @ts-ignore
          this.ozone = data ? data.currently.ozone : null;
          document.getElementById('resultsProgress').style.display = 'none';
        }
      });
    }
    this.stateSealService.getStateSealLink(this.savedState).subscribe( url => {
      this.searchEngineInfo = url;
    });

    this.stateSealURL = this.searchEngineInfo && this.searchEngineInfo.items ? this.searchEngineInfo.items[0].link : '/';

    // this.resultsAvailable = false;
    // document.getElementById('resultsProgress').style.display = 'none';
    // this.dataChanged.emit(this.resultsAvailable);
  }
}
