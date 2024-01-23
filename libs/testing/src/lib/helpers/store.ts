import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

export const StoreTesting = [
  StoreModule.forRoot({}),
  EffectsModule.forRoot([])
];
