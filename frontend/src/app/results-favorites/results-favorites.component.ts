import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {LocationService} from '../services/location.service';
import {statesList} from '../weather-search-form/states';
import {StateSealService} from '../services/state-seal.service';

@Component({
  selector: 'app-results-favorites',
  templateUrl: './results-favorites.component.html',
  styleUrls: ['./results-favorites.component.css']
})
export class ResultsFavoritesComponent implements OnChanges {

  @Input() savedCity;
  @Input() currentData;
  @Input() savedState;
  @Input() searched;
  @Input() invalid;
  @Input() noRecords;

  constructor(private stateSealService: StateSealService ) {}

  results: boolean;
  favorites: boolean;
  searchEngineInfo: any;
  favoritesData: any = [];
  stateSeal: string;
  l: number;
  i: number;

  ngOnChanges() {
    if (this.searched) {
      document.getElementById('resultButton').click();
    }
  }

  showResults() {
    if (!this.results && this.currentData) {
      this.results = true;
      this.favorites = false;
      document.getElementById('favoritesButton').style.backgroundColor = 'white';
      document.getElementById('favoritesButton').style.color = 'dimgray';
      document.getElementById('resultButton').style.backgroundColor = '#6F91A9';
      document.getElementById('resultButton').style.color = 'white';
    }
  }

  showFavorites() {
    if (!this.favorites) {
      this.favorites = true;
      this.results = false;
      document.getElementById('resultButton').style.backgroundColor = 'white';
      document.getElementById('resultButton').style.color = 'dimgray';
      document.getElementById('favoritesButton').style.backgroundColor = '#6F91A9';
      document.getElementById('favoritesButton').style.color = 'white';
    }

    this.favoritesData = [];
    this.stateSeal = '';

    this.l = localStorage.length;

    function getStateAbbreviation(state: string) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < statesList.states.length; i++) {
        if (statesList.states[i].State === state) {
          return statesList.states[i].Abbreviation;
        }
      }
    }

    if (this.l > 0) {
      for (this.i = 0; this.i < this.l; this.i++) {
        const currentFav = {id: this.i + 1, state: '', city: '', stateSealURL: ''};

        currentFav.city = localStorage.key(this.i);
        this.stateSeal = localStorage.getItem(currentFav.city);

        currentFav.state = getStateAbbreviation(this.stateSeal);
        this.stateSealService.getStateSealLink(this.stateSeal).subscribe( url => {
          this.searchEngineInfo = url;
          currentFav.stateSealURL = this.searchEngineInfo && this.searchEngineInfo.items ? this.searchEngineInfo.items[0].link : '/';
        });
        this.favoritesData.push(currentFav);

      }
    }
  }


}
