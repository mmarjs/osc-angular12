import {
  BiddingTableFormModel,
  BidDTO,
  BidItemDTO,
  JobItem,
} from '@ocean/api/shared';
import { TypedDetailFormValues } from './detail.config';
import { dateWithoutTimezone } from '@ocean/shared/utils/dateWithoutTimezone';
import { countryEntityToISO } from '@ocean/shared/utils/country-to-iso';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';

export const createBiddingTableViewModel = (
  jobItem: JobItem,
  isStoredInDB: boolean
): BiddingTableFormModel => ({
  id: jobItem.id,
  title: jobItem.title,
  amount: jobItem?.amount ?? 0,
  isStoredinDB: isStoredInDB,
  quantity: jobItem?.quantity ?? 1,
  description: jobItem?.description ?? 'description',
  comments: jobItem?.comments ?? '',
});

export const toBidDTO = (
  formValues: TypedDetailFormValues,
  bidItems: BidItemDTO[],
  bidAmount: number
): BidDTO => ({
  bidItems,
  bidAmount,
  description: 'test',
  approximateDuration: +formValues?.approximateDuration,
  workStartDate: dateWithoutTimezone(formValues?.workStartDate),
  country: countryEntityToISO(formValues?.country),
  address: formValues?.address,
  address2: formValues?.address2,
  city: formValues?.city,
  startDeposit: 1,
  state: formValues?.state,
  zipCode: formValues?.zipCode ?? '0000',
  awayFromProvidersYard: formValues?.awayFromProvidersYard,
  yardOwner: formValues?.awayFromProvidersYard ? formValues?.yardOwner : null,
});

export const toBidItems = (
  items: BiddingTableFormModel[],
  auctionName: string
) => {
  return items.map(({ amount, description, id, quantity, note, comments }) => ({
    amount: amount || 0,
    description,
    id,
    quantity,
    auctionName,
    comments: note?.text ? note.text : comments,
  }));
};

export const changeCountryISOToCountryField = (entity?: BidDTO) => {
  const code =
    typeof entity?.country === 'string'
      ? entity.country
      : entity?.country?.alpha3Code;
  return {
    ...(entity ?? {}),
    country: stringToCountryField(code),
  };
};
