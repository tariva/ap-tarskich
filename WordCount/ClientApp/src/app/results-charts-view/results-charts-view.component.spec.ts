import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsChartsViewComponent } from './results-charts-view.component';

describe('ResultsChartsViewComponent', () => {
  let component: ResultsChartsViewComponent;
  let fixture: ComponentFixture<ResultsChartsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsChartsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsChartsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
