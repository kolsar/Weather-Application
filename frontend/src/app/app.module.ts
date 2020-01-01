import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { statesListToken, statesList} from './weather-search-form/states';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultsTabsComponent } from './results-tabs/results-tabs.component';
import { WeatherSearchFormComponent } from './weather-search-form/weather-search-form.component';
import { ResultsFavoritesComponent } from './results-favorites/results-favorites.component';
import { HttpClientModule } from '@angular/common/http';
import { FavoritesComponent } from './favorites/favorites.component';
import {RouterModule} from '@angular/router';
import { CurrentTabComponent } from './current-tab/current-tab.component';
import { HourlyTabComponent } from './hourly-tab/hourly-tab.component';
import { WeeklyTabComponent } from './weekly-tab/weekly-tab.component';
import {MatInputModule, MatTooltipModule} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import {StateSealService} from './services/state-seal.service';
import {DayModalService} from './services/day-modal.service';
import {FavoriteListService} from './services/favorite-list.service';
import {LocationService} from './services/location.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    ResultsTabsComponent,
    WeatherSearchFormComponent,
    ResultsFavoritesComponent,
    FavoritesComponent,
    CurrentTabComponent,
    HourlyTabComponent,
    WeeklyTabComponent
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MatTooltipModule,
    ChartsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [
    StateSealService,
    DayModalService,
    FavoriteListService,
    LocationService,
   { provide: statesListToken, useValue: statesList },
    ],
  bootstrap: [AppComponent]
})

export class AppModule { }
