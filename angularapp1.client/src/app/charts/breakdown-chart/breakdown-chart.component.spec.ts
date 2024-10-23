import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownChartComponent } from './breakdown-chart.component';

describe('BreakdownChartComponent', () => {
  let component: BreakdownChartComponent;
  let fixture: ComponentFixture<BreakdownChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakdownChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakdownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
