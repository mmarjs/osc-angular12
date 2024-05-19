import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StripeAccountPreviewComponent } from './stripe-account-preview.component';
import { MockPipe, MockProvider } from 'ng-mocks';
import { TranslatePipe } from '@ngx-translate/core';
import { UserFacade } from '@ocean/api/state';
import { MediaService } from '@ocean/api/client';
import { provideMockStore } from '@ngrx/store/testing';
import { StripeFacadeService } from '../../../store/facade';
import { DatePipe } from '@angular/common';

describe('StripeAccountPreviewComponent', () => {
  let component: StripeAccountPreviewComponent;
  let fixture: ComponentFixture<StripeAccountPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StripeAccountPreviewComponent,
        MockPipe(TranslatePipe, (v) => v),
        MockPipe(DatePipe, (v) => v),
      ],
      providers: [
        provideMockStore(),
        StripeFacadeService,
        MockProvider(MediaService),
        MockProvider(UserFacade, {
          avatar: () => '',
        } as any),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeAccountPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
