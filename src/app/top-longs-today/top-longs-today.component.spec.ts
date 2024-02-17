import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLongsTodayComponent } from './top-longs-today.component';

describe('TopLongsTodayComponent', () => {
  let component: TopLongsTodayComponent;
  let fixture: ComponentFixture<TopLongsTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopLongsTodayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopLongsTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
