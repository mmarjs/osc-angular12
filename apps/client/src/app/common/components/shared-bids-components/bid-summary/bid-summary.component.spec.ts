import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalizationService } from '@ocean/internationalization';
import { TestModule } from '@ocean/testing/helpers/test.module';
import { MockProvider } from 'ng-mocks';

import { BidSummaryComponent } from './bid-summary.component';

describe('BidSummaryComponent', () => {
  let component: BidSummaryComponent;
  let fixture: ComponentFixture<BidSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[TestModule],
      declarations: [ BidSummaryComponent ],
      providers: [
        MockProvider(LocalizationService)
      ]
    })
    .overrideTemplate(BidSummaryComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
