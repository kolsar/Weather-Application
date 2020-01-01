import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSearchFormComponent } from './weather-search-form.component';

describe('WeatherSearchFormComponent', () => {
  let component: WeatherSearchFormComponent;
  let fixture: ComponentFixture<WeatherSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
