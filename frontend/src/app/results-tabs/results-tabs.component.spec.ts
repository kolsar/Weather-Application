import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsTabsComponent } from './results-tabs.component';


describe('ResultsTabsComponent', () => {
  let component: ResultsTabsComponent;
  let fixture: ComponentFixture<ResultsTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
