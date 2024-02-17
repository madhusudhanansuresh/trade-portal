import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketStatisticsComponent } from './market-statistics.component';

describe('MarketStatisticsComponent', () => {
  let component: MarketStatisticsComponent;
  let fixture: ComponentFixture<MarketStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
