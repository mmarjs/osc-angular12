import { BiddingTableFormModel, JobItem } from '@ocean/api/shared';

const createBiddingTableViewModel = (jobItem: JobItem, isStoredInDB: boolean): BiddingTableFormModel => ({
  id: jobItem.id,
  title: jobItem.title,
  amount: jobItem?.amount ?? 0,
  isStoredinDB: isStoredInDB,
  quantity: jobItem?.quantity ?? 1,
  description: jobItem?.description ?? 'description',
  comments: jobItem?.comments ?? ''
});

export {
  createBiddingTableViewModel,
};
