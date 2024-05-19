import { auctionsReducer } from '@ocean/client/state/auctions/reducer';
import { initialState } from '@ocean/client/state/auctions/state';
import { BidDTO, JobDTO } from '@ocean/api/shared';
import { AuctionsActions } from '@ocean/client/state';

describe('Auctions Reducer', () => {
  it('should set initialState if AuctionsActionTypes.InitAuction action called', () => {
    const initAuction = AuctionsActions.initAuction();

    const result = auctionsReducer(
      {
        isCreating: true,
        isCreateSuccess: true,
        isBidCreating: true,
        isBidCreated: true,
        hasBid: false,
      },
      initAuction
    );

    expect(result).toEqual(initialState);
  });

  it('should set isCreating = true if AuctionsActionTypes.CreateAuction action called', () => {
    const jobDTO: JobDTO = {
      id: 1,
      name: 'name',
    };

    const action = AuctionsActions.createAuction({
      auction: jobDTO,
      files: [],
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isCreating', true);
  });

  it('should set isCreateSuccess = false if AuctionsActionTypes.CreateAuction action called', () => {
    const jobDTO: JobDTO = {
      id: 1,
      name: 'name',
    };

    const action = AuctionsActions.createAuction({
      auction: jobDTO,
      files: [],
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isCreateSuccess', false);
  });

  it('should set selectedAuction if AuctionsActionTypes.SetSelectedAuction action called', () => {
    const jobDTO: JobDTO = {
      id: 1,
      name: 'name',
    };

    const action = AuctionsActions.setSelectedAuction({
      auction: jobDTO,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('selectedAuction', jobDTO);
  });

  it('should set isCreating = false if AuctionsActionTypes.CreateAuctionSuccess action called', () => {
    const jobDTO: JobDTO = {
      id: 1,
      name: 'name',
    };

    const action = AuctionsActions.createAuctionSuccess({
      auction: jobDTO,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isCreating', false);
  });

  it('should set isCreateSuccess = false if AuctionsActionTypes.CreateAuctionSuccess action called', () => {
    const jobDTO: JobDTO = {
      id: 1,
      name: 'name',
    };

    const action = AuctionsActions.createAuctionSuccess({
      auction: jobDTO,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isCreateSuccess', true);
  });

  it('should set selectedAuction if AuctionsActionTypes.CreateAuctionSuccess action called', () => {
    const jobDTO: JobDTO = {
      id: 1,
      name: 'name',
    };

    const action = AuctionsActions.createAuctionSuccess({
      auction: jobDTO,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('selectedAuction', jobDTO);
  });

  it('should set isCreating = false if AuctionsActionTypes.CreateAuctionFailure action called', () => {
    const action = AuctionsActions.createAuctionFailure({
      error: null,
    });
    const result = auctionsReducer(initialState, action);
    expect(result).toHaveProperty('isCreating', false);
  });

  it('should set isCreateSuccess = false if AuctionsActionTypes.CreateAuctionFailure action called', () => {
    const action = AuctionsActions.createAuctionFailure({
      error: null,
    });
    const result = auctionsReducer(initialState, action);
    expect(result).toHaveProperty('isCreateSuccess', false);
  });

  it('should set isCreating = true if AuctionsActionTypes.EditAuction action called', () => {
    const jobDTO: JobDTO = {
      id: 1,
      name: 'name',
    };

    const action = AuctionsActions.editAuction({
      auction: jobDTO,
      files: [],
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isCreating', true);
  });

  it('should set isCreateSuccess = false if AuctionsActionTypes.EditAuction action called', () => {
    const jobDTO: JobDTO = {
      id: 1,
      name: 'name',
    };

    const action = AuctionsActions.editAuction({
      auction: jobDTO,
      files: [],
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isCreateSuccess', false);
  });

  it('should set isCreating = false if AuctionsActionTypes.EditAuctionSuccess action called', () => {
    const jobDTO: JobDTO = {
      id: 1,
      name: 'name',
    };

    const action = AuctionsActions.editAuctionSuccess({
      auction: jobDTO,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isCreating', false);
  });

  it('should set isCreateSuccess = false if AuctionsActionTypes.EditAuctionSuccess action called', () => {
    const jobDTO: JobDTO = {
      id: 1,
      name: 'name',
    };

    const action = AuctionsActions.editAuctionSuccess({
      auction: jobDTO,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isCreateSuccess', true);
  });

  it('should set selectedAuction if AuctionsActionTypes.EditAuctionSuccess action called', () => {
    const jobDTO: JobDTO = {
      id: 1,
      name: 'name',
    };

    const action = AuctionsActions.editAuctionSuccess({
      auction: jobDTO,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('selectedAuction', jobDTO);
  });

  it('should set isCreating = false if AuctionsActionTypes.EditAuctionFailure action called', () => {
    const action = AuctionsActions.editAuctionFailure({
      error: null,
    });
    const result = auctionsReducer(initialState, action);
    expect(result).toHaveProperty('isCreating', false);
  });

  it('should set isCreateSuccess = false if AuctionsActionTypes.EditAuctionFailure action called', () => {
    const action = AuctionsActions.editAuctionFailure({
      error: null,
    });
    const result = auctionsReducer(initialState, action);
    expect(result).toHaveProperty('isCreateSuccess', false);
  });

  it('should set isBidCreating = true if AuctionsActionTypes.CreateBidOnAuction action called', () => {
    const bidMock: BidDTO = {
      id: 1,
      job: null,
    };

    const action = AuctionsActions.createBidOnAuction({
      bid: bidMock,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isBidCreating', true);
  });

  it('should set isBidCreated = false if AuctionsActionTypes.CreateBidOnAuction action called', () => {
    const bidMock: BidDTO = {
      id: 1,
      job: null,
    };

    const action = AuctionsActions.createBidOnAuction({
      bid: bidMock,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isBidCreated', false);
  });

  it('should set isBidCreating = false if AuctionsActionTypes.CreateBidOnAuctionSuccess action called', () => {
    const bidDTO: BidDTO = {
      id: 1,
      job: null,
    };

    const action = AuctionsActions.createBidOnAuctionSuccess({
      bid: bidDTO,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isBidCreating', false);
  });

  it('should set isBidCreated = false if AuctionsActionTypes.CreateBidOnAuctionSuccess action called', () => {
    const bidDTO: BidDTO = {
      id: 1,
      job: null,
    };

    const action = AuctionsActions.createBidOnAuctionSuccess({
      bid: bidDTO,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isBidCreated', true);
  });

  it('should set selectedBid if AuctionsActionTypes.CreateBidOnAuctionSuccess action called', () => {
    const bidDTO: BidDTO = {
      id: 1,
      job: null,
    };

    const action = AuctionsActions.createBidOnAuctionSuccess({
      bid: bidDTO,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('selectedBid', bidDTO);
  });

  it('should set isBidCreating = false if AuctionsActionTypes.CreateBidOnAuctionFailure action called', () => {
    const action = AuctionsActions.createBidOnAuctionFailure({
      error: null,
    });
    const result = auctionsReducer(initialState, action);
    expect(result).toHaveProperty('isBidCreating', false);
  });

  it('should set isBidCreated = false if AuctionsActionTypes.CreateBidOnAuctionFailure action called', () => {
    const action = AuctionsActions.createBidOnAuctionFailure({
      error: null,
    });
    const result = auctionsReducer(initialState, action);
    expect(result).toHaveProperty('isBidCreated', false);
  });

  it('should set selectedBid = null if AuctionsActionTypes.CreateBidOnAuctionFailure action called', () => {
    const action = AuctionsActions.createBidOnAuctionFailure({
      error: null,
    });
    const result = auctionsReducer(initialState, action);
    expect(result).toHaveProperty('selectedBid', undefined);
  });

  it('should set isBidCreating = false if AuctionsActionTypes.GetBidByAuctionSuccess action called', () => {
    const bidDTO: BidDTO = {
      id: 1,
      job: null,
    };

    const action = AuctionsActions.getBidByAuctionSuccess({
      bid: bidDTO,
      hasBid: true,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isBidCreating', false);
  });

  it('should set isBidCreated = true if AuctionsActionTypes.GetBidByAuctionSuccess action called', () => {
    const bidDTO: BidDTO = {
      id: 1,
      job: null,
    };

    const action = AuctionsActions.getBidByAuctionSuccess({
      bid: bidDTO,
      hasBid: true,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('isBidCreated', true);
  });

  it('should set selectedBid if AuctionsActionTypes.GetBidByAuctionSuccess action called', () => {
    const bidDTO: BidDTO = {
      id: 1,
      job: null,
    };

    const action = AuctionsActions.getBidByAuctionSuccess({
      bid: bidDTO,
      hasBid: true,
    });

    const result = auctionsReducer(initialState, action);

    expect(result).toHaveProperty('selectedBid', bidDTO);
  });
});
