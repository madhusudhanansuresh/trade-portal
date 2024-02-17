import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopShortsTodayComponent } from './top-shorts-today.component';

describe('TopShortsTodayComponent', () => {
  let component: TopShortsTodayComponent;
  let fixture: ComponentFixture<TopShortsTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopShortsTodayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopShortsTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
