import { SessionEffects } from './session/effects';

import { BoatsEffects } from './boats/effects';
import { AuctionsEffects } from './auctions/effects';
import { RouterEffects } from './router/effects';
import { ErrorEffects } from './ngrx-error/effects';
import { DraftsEffects } from './drafts/effects';
import { BidsEffects } from './bids/effects';
import { ImagesEffects } from './images/images.effects';

export const effects = [
  SessionEffects,
  BoatsEffects,
  AuctionsEffects,
  ImagesEffects,
  ErrorEffects,
  RouterEffects,
  DraftsEffects,
  BidsEffects
];
