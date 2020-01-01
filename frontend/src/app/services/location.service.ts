import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  currentLocationURL = 'http://ip-api.com/json';

  nodeCurrentLocationURL = 'http://weather-application-hw8.appspot.com/getCurrentLocationDetails';

  nodeFormInputURL = 'http://weather-application-hw8.appspot.com/getFormLocationDetails';

  locationJSONObj: Observable<object>;

  constructor(private httpClient: HttpClient) {}

  public getCurrentLocation() {
    return this.httpClient.get(this.currentLocationURL);

  }

  public getCurrentLocationDetails(current) {
    const params = new HttpParams()
      .set('latitude', current.lat ? current.lat : null)
      .set('longitude', current.lon ? current.lon : null);
    this.locationJSONObj = this.httpClient.get(this.nodeCurrentLocationURL, {params});
    return this.locationJSONObj;
  }

  public getFormLocationDetails(formInfo) {
    const params = new HttpParams()
      .set('street', formInfo.street)
      .set('city', formInfo.city)
      .set('state', formInfo.state);
    this.locationJSONObj = this.httpClient.get(this.nodeFormInputURL, {params});
    return this.locationJSONObj;
  }

}

export class GetLocationService {
}
