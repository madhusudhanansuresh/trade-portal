import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWatchlistComponent } from './my-watchlist.component';

describe('MyWatchlistComponent', () => {
  let component: MyWatchlistComponent;
  let fixture: ComponentFixture<MyWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyWatchlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
