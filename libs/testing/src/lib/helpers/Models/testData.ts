import { BidStatus, DurationUnit, PaymentEvent } from "@ocean/api/shared";

export const bidTestData=[
  {
    bidAmount: 5000,
    bidItems: [{
      amount: 2000,
      description: 'test',
      id: 100,
      quantity: 100
    }],
    description: 'Test',
    id: 3,
    minBid: 500,
    status: BidStatus.IN_REVIEW,
    approximateDuration: 50,
    autoBid: false,
    bidderLocation: 'Test',
    bidderName: 'Test',
    durationUnit: DurationUnit.HOURS,
    jobId: 55,
    startDeposit: 1000,
    workStartDate: '10/09/22'
  }]


export const selectedAuctionTestData={
  id: 42010,
  name: "ssss",
  description: "sssss",
  status: "DRAFT",
  type: "REPAIR",
  commissionPaid: true,
  currencyCode: "USD",
  jobItems: [
      {
          "id": 42011,
          "title": "ddd",
          "description": "dddd"
      }
  ],
  auctionStartDate: "2022-07-15",
  auctionEndDate: "2022-07-18",
  boatId: 4010,
  boat: {
      "id": 4010,
      "name": "DDDD",
      "makeModelYear": "2022",
      "type": "qqqq",
      "length": "122",
      "address": "Vishakapatnam",
      "address2": "",
      "city": "Bangalore",
      "state": "Karnataka",
      "zipCode": "560069",
      "about": "ddddd",
      "images": []
  },
  bidders: 0
}



export const DummyAcceptedBidData = {
  bidAmount: 5000,
  bidItems: [{
    amount: 2000,
    description: 'test',
    id: 100,
    quantity: 100
  }],
  description: 'Test',
  id: 3,
  minBid: 500,
  status: BidStatus.ACCEPTED,
  approximateDuration: 50,
  autoBid: false,
  bidderLocation: 'Test',
  bidderName: 'Test',
  durationUnit: DurationUnit.HOURS,
  jobId: 55,
  startDeposit: 1000,
  workStartDate: '10/09/22'
}

export const DummyPaidBidData = {
  bidAmount: 5000,
  bidItems: [
    {
      amount: 2000,
      description: 'test',
      id: 100,
      quantity: 100,
    },
  ],
  description: 'Test',
  id: 3,
  minBid: 500,
  status: BidStatus.ACCEPTED,
  approximateDuration: 50,
  autoBid: false,
  bidderLocation: 'Test',
  bidderName: 'Test',
  durationUnit: DurationUnit.HOURS,
  jobId: 55,
  startDeposit: 1000,
  workStartDate: '10/09/22',
  paymentItemDTO: {
    eventType: PaymentEvent.SUCCEEDED,
  }
};

export const DummyBidData={
  bidAmount: 5000,
  bidItems: [{
    amount: 2000,
    description: 'test',
    id: 100,
    quantity: 100
  }],
  description: 'Test',
  id: 3,
  minBid: 500,
  status: BidStatus.IN_REVIEW,
  approximateDuration: 50,
  autoBid: false,
  bidderLocation: 'Test',
  bidderName: 'Test',
  durationUnit: DurationUnit.HOURS,
  jobId: 55,
  startDeposit: 1000,
  workStartDate: '10/09/22'
}

export const imageTransFormData={
  "fileURL": "http://res.cloudinary.com/oceanservicecenter/image/authenticated/s--lVn-TDqw--/v1656480420/i7l5s8cquitucnqcsruj.jpg",
  "secureFileURL": "https://res.cloudinary.com/oceanservicecenter/image/authenticated/s--lVn-TDqw--/v1656480420/i7l5s8cquitucnqcsruj.jpg",
  "bytes": 137011,
  "createdOn": "2022-06-29T05:27:00Z",
  "originalFilename": "esdygaccru-shipyards-3-hi8ym.jpg",
  "tags": [
    "4010",
    "62ba8aa171ad0c04e6c124b7"
  ],
  "fileTitle": "DDDD",
  "version": null,
  "publicId": "i7l5s8cquitucnqcsruj",
  "format": "jpg",
  "signature": null,
  "deliveryType": "authenticated",
  "resourceType": "image",
  "transformationsList": [
    {
      "id": "0-i7l5s8cquitucnqcsruj",
      "fileURL": "http://res.cloudinary.com/oceanservicecenter/image/authenticated/s--o4dwMdfv--/t_carousel_main/v1656480420/i7l5s8cquitucnqcsruj.jpg",
      "secureFileURL": "https://res.cloudinary.com/oceanservicecenter/image/authenticated/s--o4dwMdfv--/t_carousel_main/v1656480420/i7l5s8cquitucnqcsruj.jpg",
      "bytes": 61006,
      "format": "jpg",
      "transformations": "t_carousel_main"
    },
    {
      "id": "1-i7l5s8cquitucnqcsruj",
      "fileURL": "http://res.cloudinary.com/oceanservicecenter/image/authenticated/s--QjAnc-LA--/t_carousel_thumb/v1656480420/i7l5s8cquitucnqcsruj.jpg",
      "secureFileURL": "https://res.cloudinary.com/oceanservicecenter/image/authenticated/s--QjAnc-LA--/t_carousel_thumb/v1656480420/i7l5s8cquitucnqcsruj.jpg",
      "bytes": 2154,
      "format": "jpg",
      "transformations": "t_carousel_thumb"
    },
    {
      "id": "2-i7l5s8cquitucnqcsruj",
      "fileURL": "http://res.cloudinary.com/oceanservicecenter/image/authenticated/s--FW-IBNfy--/t_thumb/v1656480420/i7l5s8cquitucnqcsruj.jpg",
      "secureFileURL": "https://res.cloudinary.com/oceanservicecenter/image/authenticated/s--FW-IBNfy--/t_thumb/v1656480420/i7l5s8cquitucnqcsruj.jpg",
      "bytes": 2612,
      "format": "jpg",
      "transformations": "t_thumb"
    }
  ]
}
