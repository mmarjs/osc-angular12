import { of } from "rxjs";
// import { BiddingTableFormTestModel } from "./Models/bidsTestModel";

// export class BidItemsTestFacade {

//   initBidItems;
//   updateOne;
//   biddingTableFormModel$;
//   deleteBidItem;
//   addBidItem;

//   constructor() {
//    this.initBidItems=()=>({});
//    this.updateOne=()=>({});
//    this.biddingTableFormModel$=of(BiddingTableFormTestModel);
//   this.deleteBidItem=()=>({});
//   this.addBidItem=()=>({});
//   }


// }

export let mockBidItemsFacade={
  biddingTableFormModel$:of([{
    id: 123,
    title: 'test',
    amount: 150,
    isStoredinDB: false,
    description: 'description',
  }]),
  initBidItems:()=>true,
  updateOne:()=>(true ),
  deleteBidItem:()=>true,
  addBidItem:()=>true
}
