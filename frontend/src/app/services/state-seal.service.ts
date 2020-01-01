import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateSealService {

  nodeGetStateSeal = 'http://weather-application-hw8.appspot.com/getStateSeal';


  constructor(private httpClient: HttpClient) {}

  public getStateSealLink(state) {
    const params = new HttpParams()
      .set('state', state);
    return this.httpClient.get(this.nodeGetStateSeal, {params});
  }


}
