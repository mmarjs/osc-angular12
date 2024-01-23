import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PartialsModule } from '@ocean/shared/partials/partials.module';
import { MockModule, MockPipe } from 'ng-mocks';

import { AuctionTimeRemainingComponent } from './auction-time-remaining.component';

describe('AuctionTimeRemainingComponent', () => {
  let component: AuctionTimeRemainingComponent;
  let fixture: ComponentFixture<AuctionTimeRemainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        MockModule( PartialsModule ),
      ],
      declarations: [

        AuctionTimeRemainingComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionTimeRemainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
