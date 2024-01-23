import { Injectable } from '@angular/core';
import { ClientService, Params } from '@ocean/api/client';
import { Bid, BidDTO, BidItemDTO } from '@ocean/api/shared';

import {
  BidAcceptBidRequest,
  BidAddItemRequest,
  BidCreateBidRequest,
  BidFindByBoatIdRequest,
  BidFindByIdRequest,
  BidPayRequest,
  BidUpdateItemRequest,
  GetMyBids,
} from './requests';

@Injectable({
  providedIn: 'root',
})
export class BidProvider {
  public constructor(private readonly api: ClientService) {}
  baseUrl:string='/api/bids'
  /**
   * CreateBid
   * Responses: 200, 201, 401, 403, 404
   */
  public createBid(request: BidCreateBidRequest) {
    const params = new Params(request, [], [], ['bidDto']);

    return this.api.request<BidDTO>({
      url: `${this.baseUrl}`,
      method: 'POST',
      data: params.forBody,
    });
  }

  /**
   * EditBid
   * Responses: 200, 201, 401, 403, 404
   */
  public editBid(request: BidCreateBidRequest) {
    const params = new Params(request, [], [], ['bidDto']);

    return this.api.request<Bid>({
      url: `${this.baseUrl}/${request.bidDto.id}`,
      method: 'PUT',
      data: params.forBody,
    });
  }

  /**
   * FindByBoatId
   * Responses: 200, 401, 403, 404
   */
  public findByBoatId(request: BidFindByBoatIdRequest) {
    return this.api.request<Array<BidDTO>>({
      url: `${this.baseUrl}/job/${request.id}`,
      method: 'GET',
    });
  }

  /**
   * FindById
   * Responses: 200, 401, 403, 404
   */
  public findById(request: BidFindByIdRequest) {
    return this.api.request<Bid>({
      url: `${this.baseUrl}/${request.id}`,
      method: 'GET',
    });
  }

  /**
   * FindByAuctionId
   * Responses: 200, 401, 403, 404
   */
  public findByAuctionId(id: number) {
    return this.api.request<Bid[]>({
      url: `${this.baseUrl}/job/${id}`,
      method: 'GET',
    });
  }

  public payBid(id: number, body: BidPayRequest) {
    return this.api.request({
      url: `${this.baseUrl}/${id}/pay`,
      method: 'POST',
      data: body,
    });
  }

  /**
   * AcceptBid
   * Responses: 200, 201, 401, 403, 404
   */
  public acceptBid(request: BidAcceptBidRequest) {
    return this.api.request({
      url: `${this.baseUrl}/${request.id}/accept`,
      method: 'POST',
    });
  }

  public rejectBid(request: BidAcceptBidRequest) {
    return this.api.request({
      url: `${this.baseUrl}/${request.id}/reject`,
      method: 'POST',
    });
  }

  /**
   * AddItem
   * Responses: 200, 201, 401, 403, 404
   */
  public addItem(request: BidAddItemRequest) {
    const params = new Params(request, ['id'], [], ['dto']);

    return this.api.request<BidItemDTO>({
      url: `${this.baseUrl}/${request.id}/bid-item`,
      method: 'POST',
      data: params.forBody,
    });
  }

  /**
   * UpdateItem
   * Responses: 200, 201, 401, 403, 404
   */
  public updateItem(request: BidUpdateItemRequest) {
    const params = new Params(request, ['id', 'itemId'], [], ['dto']);

    return this.api.request<BidItemDTO>({
      url: `${this.baseUrl}/${request.id}/bid-item/${request.itemId}`,
      method: 'PUT',
      data: params.forBody,
    });
  }


  public getBidByAuctionId(auctionId:number) {
    return this.api.request<BidDTO>({
      url: `${this.baseUrl}/jobs/${auctionId}/users/current`,
      method: 'GET',
    });
  }

  public getMyBids(request:GetMyBids) {
    return this.api.request({
      url: `${this.baseUrl}/users/current`,
      method: 'GET',
      params: request.pageable
    });
  }


  public editBidWithoutBidId(request: BidCreateBidRequest) {
    const params = new Params(request, [], [], ['bidDto']);
    return this.api.request<Bid>({
      url: `${this.baseUrl}`,
      method: 'PUT',
      data: params.forBody,
    });
  }

}
