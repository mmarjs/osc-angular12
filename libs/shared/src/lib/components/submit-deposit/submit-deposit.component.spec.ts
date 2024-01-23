import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDepositComponent } from './submit-deposit.component';

describe('SubmitDepositComponent', () => {
  let component: SubmitDepositComponent;
  let fixture: ComponentFixture<SubmitDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
