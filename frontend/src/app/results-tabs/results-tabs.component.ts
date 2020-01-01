import {Component, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-results-tabs',
  templateUrl: './results-tabs.component.html',
  styleUrls: ['./results-tabs.component.css']
})
export class ResultsTabsComponent implements OnChanges {
 @Input() savedCity;
 @Input() currentData;
 @Input() savedState;
 @Input() invalid;
 @Input() noRecords;
  i: number;
  l: number;

  dataLoading: boolean;
  isStarred: boolean;
  resultsAvailable: boolean;
  constructor() {
    this.dataLoading = true;
    this.isStarred = false;
    this.resultsAvailable = true;
    this.l = localStorage.length;

    for (this.i = 0; this.i < this.l; this.i++) {
      // tslint:disable-next-line:triple-equals
      if (localStorage.key(this.i) == this.savedCity) {
        // tslint:disable-next-line:triple-equals
        if (localStorage.getItem(localStorage.key(this.i)) == this.savedState) {
          this.isStarred = true;
        }
      }
    }
  }

  ngOnChanges() {
    this.isStarred = false;
    this.l = localStorage.length;

    for (this.i = 0; this.i < this.l; this.i++) {
      // tslint:disable-next-line:triple-equals
      if (localStorage.key(this.i) == this.savedCity) {
        // tslint:disable-next-line:triple-equals
        if (localStorage.getItem(localStorage.key(this.i)) == this.savedState) {
          this.isStarred = true;
        }
      }
    }
  }

  tweet() {
    let summary = '';
    let temperature = '';
    if (this.currentData) {
      summary = this.currentData.currently.summary;
      temperature = this.currentData.currently.temperature;
    }
    const tweetUrl = 'https://twitter.com/intent/tweet';
    const text = '?text=The current temperature at ' + this.savedCity + ' is ' + temperature + '°F.' +
      ' The weather conditions are ' + summary + '.';
    const hashtags = '&hashtags=CSCI571WeatherSearch';
    window.open(tweetUrl + text + hashtags);
  }

  favoriteToggle() {
    if (this.isStarred) {
      this.isStarred = false;
      localStorage.removeItem(this.savedCity);
    } else {
      this.isStarred = true;
      localStorage.setItem(this.savedCity, this.savedState);
    }
  }
}
