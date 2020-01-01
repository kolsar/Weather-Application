import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DayModalService {

  nodeDayModalURL = 'http://weather-application-hw8.appspot.com/getDayModalData';

  dayData: Observable<object>;

  constructor(private httpClient: HttpClient) {}

  public getDayModalData(lat, lon, timestamp) {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('timestamp', timestamp);
    this.dayData = this.httpClient.get(this.nodeDayModalURL, {params});
    return this.dayData;

  }
}
