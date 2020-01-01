import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { statesListToken, statesList } from './states';
import { LocationService } from '../services/location.service';
import { AutocompleteCityService} from '../services/autocomplete-city.service';

@Component({
  selector: 'app-weather-search-form',
  templateUrl: './weather-search-form.component.html',
  styleUrls: ['./weather-search-form.component.css']
})

export class WeatherSearchFormComponent implements OnInit {
  savedCity: string;
  savedState: string;
  formTitle = 'Weather Search';
  form: FormGroup;
  currentLocation: {lat: '', lon: '', city: '', regionName: ''};
  isCurrentLocation: boolean;
  currentData: any;
  private eachState: any;
  searched: boolean;
  invalid: boolean;
  noRecords: boolean;
  whitespace: boolean;
  cityList = [];

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private autocityService: AutocompleteCityService,
    // tslint:disable-next-line:no-shadowed-variable
    @Inject(statesListToken) public statesList) { this.whitespace = false; }

  get street() {
    return this.form.get('street');
  }

  get city() {
    return this.form.get('city');
  }

  get state() {
    return this.form.get('state');
  }

  get currentLocationCheckBox() {
    return this.form.get('currentLocationCheckBox');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      street: this.formBuilder.control({value: '', disabled: false}, [ Validators.required ]),
      city: this.formBuilder.control({value: '', disabled: false}, Validators.required),
      state: this.formBuilder.control({value: 'default', disabled: false}),
      currentLocationCheckBox: this.formBuilder.control({value: false, disabled: false})
    });
    this.locationService.getCurrentLocation().subscribe((data: {lat: '', lon: '', city: '', regionName: ''}) => {
      this.currentLocation = data;
    });
    this.savedState = 'California';
  }

  onSubmit(formInfo) {
    this.isCurrentLocation = this.currentLocationCheckBox.value;
    if (document.getElementById('resultsProgress')) {
      document.getElementById('resultsProgress').style.display = 'block';
    }

    this.getWeatherData(formInfo);

    this.searched = true;
    document.getElementById('results').hidden = false;

  }

  getWeatherData(formInfo) {
   if (formInfo != null) {
      if (this.isCurrentLocation) {
        this.locationService.getCurrentLocationDetails(this.currentLocation);
        this.savedCity = this.currentLocation.city;
        this.savedState = this.currentLocation.regionName;
      } else {
        this.locationService.getFormLocationDetails(formInfo);
        this.savedCity = this.form.get('city').value;
        const statesKeys = Object.values(statesList.states);

        for (this.eachState of statesKeys) {
          if (this.eachState.Abbreviation === this.form.get('state').value) {
            this.savedState = this.eachState.State;
          }
        }
      }
    } else {
      const data = document.getElementById('triggorFav').innerText;
      const arr = data.split(';');
      formInfo = {};
      formInfo.state = arr[0];
      formInfo.city = arr[1];
      formInfo.street = null;
      this.locationService.getFormLocationDetails(formInfo);
      this.savedCity = formInfo.city;
      this.savedState = formInfo.state;
    }

   this.locationService.locationJSONObj.subscribe(observer => {
     this.currentData = observer;
     this.savedState = 'California';
     this.invalid = false;
     this.noRecords = false;
     if (this.currentData == null) {
        this.invalid = true;
      } else if (this.currentData.error === 'The given location is invalid.') {
        this.noRecords = true;
      }
    });
  }

  clearPage() {
    this.searched = false;
    this.cityList = [];
    document.getElementById('results').hidden = true;
  }

  inputUpdate() {
    const input = this.form.get('city').value;
    this.autocityService.getCityList(input).subscribe( data => {
      if (data) {
        this.cityList = [];
        // @ts-ignore
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.predictions.length; i++) {
          // @ts-ignore
          this.cityList.push(data.predictions[i].structured_formatting.main_text);
        }
      }
    });
  }
}
