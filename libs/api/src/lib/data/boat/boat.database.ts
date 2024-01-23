import { Injectable } from '@angular/core';
import { BoatProvider, BoatSearchBoatsRequest } from '@ocean/api/services';

@Injectable({
  providedIn: 'root'
})
export class BoatDatabase {
  constructor(private api: BoatProvider) {}

  fetch(args: BoatSearchBoatsRequest) {
    if (args.searchKey) {
      return this.api.searchBoats(args);
    } else {
      return this.api.getBoats(args);
    }
  }
}
