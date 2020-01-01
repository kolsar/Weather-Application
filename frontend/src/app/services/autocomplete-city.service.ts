import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteCityService {

  nodeDayModalURL = 'http://weather-application-hw8.appspot.com/getAutoCompleteCityList';

  constructor(private httpClient: HttpClient) {}

  public getCityList(input) {
    const params = new HttpParams()
      .set('input', input);
    return this.httpClient.get(this.nodeDayModalURL, {params});
  }
}
