import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteListService {
  favoriteList: any = [];
  constructor() { }
}
