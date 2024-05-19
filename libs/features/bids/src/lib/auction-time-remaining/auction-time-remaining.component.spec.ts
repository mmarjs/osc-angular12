/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { AuctionsFacade } from '@ocean/client/state';
import { LinkDirective } from '@ocean/shared';
import { ButtonComponent } from '@ocean/shared/partials/button/button.component';
import { TimeRemainingComponent } from '@ocean/shared/partials/time-remaining/time-remaining.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MockPipe, MockProvider, ngMocks } from 'ng-mocks';
import { AuctionTimeRemainingComponent } from './auction-time-remaining.component';

ngMocks.autoSpy('jest');

describe('AuctionTimeRemainingComponent', () => {
  it('should extend auction', async () => {
    await render(AuctionTimeRemainingComponent, {
      imports: [MatButtonModule, RouterTestingModule],
      declarations: [
        MockPipe(TranslatePipe, (v) => v),
        LinkDirective,
        TimeRemainingComponent,
        ButtonComponent,
      ],
      providers: [MockProvider(AuctionsFacade)],
      componentProperties: {
        auctionId: 1089,
      },
    });

    const facade = TestBed.inject(AuctionsFacade);

    userEvent.click(
      screen.getByRole('button', { name: 'BIDS.EXTEND_AUCTION' })
    );

    expect(facade.extendAuctionEndDate).toHaveBeenCalledWith(1089);
  });
});
