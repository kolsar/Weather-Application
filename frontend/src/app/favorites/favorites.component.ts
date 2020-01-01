import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { StateSealService} from '../services/state-seal.service';
import { statesList} from '../weather-search-form/states';
import { LocationService} from '../services/location.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnChanges {
  emptyFavorites: boolean;
  searchEngineInfo: any;
  i: number;
  l: number;
  stateSeal: string;
  @Input() currentData;
  @Input() favoritesData;

  constructor(private stateSealService: StateSealService,
              private locationService: LocationService) {
    this.stateSeal = '';
  }

  ngOnChanges(): void {
    this.emptyFavorites = this.favoritesData.length === 0;
  }

  deleteRow(id) {
    localStorage.removeItem(id);

    this.favoritesData = [];

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

    this.emptyFavorites = this.favoritesData.length === 0;

  }

  showFavoriteDetails(inputCity, inputState) {

    function getState(state: string) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < statesList.states.length; i++) {
        if (statesList.states[i].Abbreviation === state) {
          return statesList.states[i].State;
        }
      }
    }
    document.getElementById('inputStreet').innerText = ' ';
    // @ts-ignore
    document.getElementById('inputCity').value = inputCity;
    // @ts-ignore
    document.getElementById('state').value = inputState;
    // @ts-ignore
    document.getElementById('currentLocation').checked = false;
    document.getElementById('triggorFav').innerText = getState(inputState) + ';' + inputCity;
    const ele = document.getElementById('remoteTrig');
    ele.click();
  }
}
