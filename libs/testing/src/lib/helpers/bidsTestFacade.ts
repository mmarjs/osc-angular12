import { of } from "rxjs";
import { bidTestData } from "./Models/testData";

export let mockBidsFacade={
  myBids$:of(bidTestData),
  editBid:()=>true
}