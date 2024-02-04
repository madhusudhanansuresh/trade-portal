import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStocksTodayComponent } from './top-stocks-today.component';

describe('TopStocksTodayComponent', () => {
  let component: TopStocksTodayComponent;
  let fixture: ComponentFixture<TopStocksTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopStocksTodayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopStocksTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
