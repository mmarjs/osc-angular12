import { Injectable } from '@angular/core';
import { BidFindByBoatIdRequest, BidProvider } from '@ocean/api/services';

@Injectable({
  providedIn: 'root'
})
export class BidDatabase {
  constructor(private api: BidProvider) { }

  fetch(args: BidFindByBoatIdRequest) {
    return this.api.findByBoatId(args);
  }
}
