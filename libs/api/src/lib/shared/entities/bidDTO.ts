import { DurationUnit } from '.';
import { BidItemDTO } from './bidItemDTO';
import { JobDTO } from './jobDTO';
import { Country } from '@angular-material-extensions/select-country';
import { PaymentEvent  } from './bid';

export interface BidDTO {
  bidAmount?: number;
  bidItems?: Array<BidItemDTO>;
  description?: string;
  id?: number;
  jobId?: number;
  job?: JobDTO;
  minBid?: number;
  status?: string;
  approximateDuration?: number;
  durationUnit?: DurationUnit;
  workStartDate?: string;
  bidderLocation?: string;
  bidderName?: string;
  startDeposit?: number;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string | Country;
  awayFromProvidersYard?: boolean;
  yardOwner?: string;
  paymentItemDTO?: {
    paymentIntentId: string,
    eventType: PaymentEvent
  }
}
