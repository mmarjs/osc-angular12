import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { TrustedByComponent } from './trusted-by.component';

describe('TrustedByComponent', () => {
  let component: TrustedByComponent;
  let fixture: ComponentFixture<TrustedByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrustedByComponent, MockPipe(TranslatePipe, (v) => v)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
