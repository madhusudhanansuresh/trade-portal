import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProgressSpinnerComponent } from './app-progress-spinner.component';

describe('AppProgressSpinnerComponent', () => {
  let component: AppProgressSpinnerComponent;
  let fixture: ComponentFixture<AppProgressSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppProgressSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
