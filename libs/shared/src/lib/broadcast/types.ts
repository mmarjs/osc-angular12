import { UserTypeTitles } from '@ocean/api/shared';

export const enum BroadcastChannelType {
  USER_TYPE = 'USER_TYPE',
}

export interface BroadcastRawData {
  type: undefined;
  data: undefined;
}

export interface BroadcastUserType {
  type: BroadcastChannelType.USER_TYPE;
  data: UserTypeTitles;
}

export type BroadcastChannelData = BroadcastRawData | BroadcastUserType;
