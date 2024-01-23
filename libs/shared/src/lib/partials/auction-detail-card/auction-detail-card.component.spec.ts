import { mediaResponse } from './mock/mediaResponse';
import { TranslatePipe } from '@ngx-translate/core';
import { JobProvider } from '@ocean/api/services';
import { ComponentsModule } from '@ocean/components';
import { render, screen } from '@testing-library/angular';
import { MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AuctionDetailCardComponent } from './auction-detail-card.component';

describe('AuctionDetailCardComponent', () => {
  const getAssociatedMediaMock = jest.fn(() => of([]));

  const deps = {
    imports: [ComponentsModule],
    declarations: [MockPipe(TranslatePipe, (value: string) => value)],
    providers: [
      MockProvider(JobProvider, {
        getAssociatedMedia: getAssociatedMediaMock,
      }),
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', async () => {
    await render(AuctionDetailCardComponent, {
      ...deps,
      componentProperties: {
        auction: {
          id: 1,
          auctionStartDate: new Date('2021-01-01'),
          auctionEndDate: new Date('2021-03-07'),
          type: 'REPAIR',
        },
      },
    });

    expect(getAssociatedMediaMock).toHaveBeenCalledWith(1);

    expect(screen.queryByText('APPLICATION.REPAIR')).toBeInTheDocument();
    expect(screen.queryByText('1/1/21')).toBeInTheDocument();
    expect(screen.queryByText('3/7/21')).toBeInTheDocument();
  });

  it('should show default image if not media associated', async () => {
    await render(AuctionDetailCardComponent, {
      ...deps,
      componentProperties: { auction: { id: 1 } },
    });

    expect(screen.queryByRole('img')).toBeInTheDocument();
    expect(screen.queryByRole('img')).toHaveProperty(
      'src',
      'http://localhost/assets/images/no-image.png'
    );
  });

  it('should show associated images', async () => {
    getAssociatedMediaMock.mockReturnValue(of([mediaResponse, mediaResponse]));

    await render(AuctionDetailCardComponent, {
      ...deps,
      componentProperties: { auction: { id: 1 } },
    });

    // 2 in preview + 2 in carousel
    expect(screen.queryAllByRole('img')).toHaveLength(4);
  });
});
