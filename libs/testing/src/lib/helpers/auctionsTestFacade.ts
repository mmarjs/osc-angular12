import { of } from "rxjs";
import { selectedAuctionTestData } from "./Models/testData";

export let mockAuctionsFacade = {
  setSelectedAuction: () => true,
  createBid: () => { },
  auctions$: of(selectedAuctionTestData),
  isCreateSuccess$: of(false),
  init:()=>true,
  selectedAuction$: of(selectedAuctionTestData),
  edit: () => true,
  create:()=>{},
  selectedBid$: of({}),
}
