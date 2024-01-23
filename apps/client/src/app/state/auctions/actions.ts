import { createAction, props } from '@ngrx/store';
import { BidDTO, JobDTO } from '@ocean/api/shared';
import { Document } from 'libs/documents/src/lib/state/models';

export const AuctionsActions = {
  initAuction: createAction(`[Auctions] Init Auction`),
  setSelectedAuction: createAction(`[Auctions] Set Selected Auction`, props<{ auction: JobDTO }>()),

  getAuctionById: createAction(`[Auctions] Get Auction By Id`, props<{ id: number }>()),
  getAuctionByIdSuccess: createAction(`[Auctions] Get Auction By Id Success`, props<{ auction: JobDTO }>()),
  getAuctionByIdFailure: createAction(`[Auctions] Get Auction By Id Failure`, props<{ error?: Error }>()),
  
  createAuction: createAction(`[Auctions] Create Auction`, props<{ auction: JobDTO; files: File[] }>()),
  createAuctionSuccess: createAction(`[Auctions] Create Auction Success`, props<{ auction: JobDTO }>()),
  createAuctionFailure: createAction(`[Auctions] Create Auction Failure`, props<{ error?: Error }>()),

  editAuction: createAction(`[Auctions] Edit Auction`, props<{ auction: JobDTO; files: File[] }>()),
  editAuctionSuccess: createAction(`[Auctions] Edit Auction Success`, props<{ auction: JobDTO }>()),
  editAuctionFailure: createAction(`[Auctions] Edit Auction Failure`, props<{ error?: Error }>()),

  createBidOnAuction: createAction(`[Auctions] Create Bid On Auction`, props<{ bid: BidDTO }>()),
  createBidOnAuctionSuccess: createAction(`[Auctions] Create Bid On Auction Success`, props<{ bid: BidDTO }>()),
  createBidOnAuctionFailure: createAction(`[Auctions] Create Bid On Auction Failure`, props<{ error?: Error }>()),

  payAuction: createAction(`[Auctions] Pay Auction`, props<{ id: string }>()),
  payAuctionSuccess: createAction(`[Auctions] Pay Auction Success`, props<{ bid: BidDTO }>()),
  payAuctionFailure: createAction(`[Auctions] Pay Auction Failure`, props<{ error?: Error }>()),

  auctionCancel: createAction(`[Auctions] Auction Cancel`, props<{ id: number }>()),
  auctionCancelSuccess: createAction(`[Auctions] Auction Cancel Success`, props<{ auction: JobDTO }>()),
  auctionCancelFailure: createAction(`[Auctions] Auction Cancel Failure`, props<{ error?: Error }>()),

  getBidByAuction: createAction(`[Auctions] Get Bid By Auction`, props<{ id: number }>()),
  getBidByAuctionSuccess: createAction(`[Auctions] Get Bid By Auction Success`, props<{ bid: BidDTO }>()),
  getBidByAuctionFailure: createAction(`[Auctions] Get Bid By Auction Failure`, props<{ error?: Error }>()),

  resetSelectedBid: createAction(`[Auctions] Reset Selected Bid`),

  markAsInProgress: createAction(`[Auctions] Mark As In Progress`, props<{ id: number }>()),
  markAsInProgressSuccess: createAction(`[Auctions] Mark As In Progress Success`, props<{ auction: JobDTO }>()),
  markAsInProgressFailure: createAction(`[Auctions] Mark As In Progress Failure`, props<{ error?: Error }>()),

  markAsCompleted: createAction(`[Auctions] Mark As Completed`, props<{ id: number }>()),
  markAsCompletedSuccess: createAction(`[Auctions] Mark As Completed Success`, props<{ auction: JobDTO }>()),
  markAsCompletedFailure: createAction(`[Auctions] Mark As Completed Failure`, props<{ error?: Error }>()),


  getDocuments: createAction(`[Auctions] Get Documents`, props<{ auctionId: number }>()),
  getDocumentsSuccess: createAction(`[Auctions] Get Documents Success`, props<{ document: Document }>()),
  getDocumentsFailure: createAction(`[Auctions] Get Documents Failure`, props<{ error?: Error }>()),
  setSelectedDocument: createAction(`[Auctions] Set Selected Document`, props<{ document:Document }>())

};
