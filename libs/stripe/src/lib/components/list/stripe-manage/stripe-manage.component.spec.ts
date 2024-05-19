import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StripeManageComponent } from './stripe-manage.component';
import { StripeFacadeService } from '../../../store/facade';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';

describe('StripeManageComponent', () => {
  let component: StripeManageComponent;
  let fixture: ComponentFixture<StripeManageComponent>;
  let stripeFacadeService: StripeFacadeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StripeManageComponent, MockPipe(TranslatePipe, (v) => v)],
      providers: [provideMockStore(), StripeFacadeService],
    }).compileComponents();

    fixture = TestBed.createComponent(StripeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    stripeFacadeService = TestBed.inject(StripeFacadeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(stripeFacadeService).toBeTruthy();
  });
});
