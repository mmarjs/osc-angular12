import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { TestModule, TestStoreEnvModule } from '@ocean/testing/helpers/test.module';
import { MockPipe } from 'ng-mocks';

import { AuctionBidsProcessComponent } from './auction-bids-process.component';

describe('AuctionBidsProcessComponent', () => {
  let component: AuctionBidsProcessComponent;
  let fixture: ComponentFixture<AuctionBidsProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TestStoreEnvModule, TestModule],
      declarations: [
        AuctionBidsProcessComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionBidsProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
