import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketcapchartComponent } from './marketcapchart.component';

describe('MarketcapchartComponent', () => {
  let component: MarketcapchartComponent;
  let fixture: ComponentFixture<MarketcapchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketcapchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketcapchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
