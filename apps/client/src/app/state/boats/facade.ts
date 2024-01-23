import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { forkJoin, mergeMap, Observable, of } from 'rxjs';
import { Boat } from '@ocean/api/shared';
import { BoatActions } from './actions';
import { boatsQuery } from './selectors';
import { PartialState } from './state.partial';
import { MediaService } from '@ocean/api/client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoatsFacade {
  total$ = this.store.pipe(select(boatsQuery.getTotal));

  updatedItem$ = this.store.pipe(select(boatsQuery.getUpdatedItem));

  createdBoat$ = this.store.pipe(select(boatsQuery.getCreatedBoat));

  selectedBoat$: Observable<Boat | undefined> = this.store.pipe(
    select(boatsQuery.getSelectedBoat),
    mergeMap((boat?: Boat) => forkJoin([of(boat ?? {}), !!boat.id ? this.mediaService.getFilesByTags({tags: boat.id}) : of(undefined)])),
    map(([boat, images]) => ({...boat, imageTransforms: images ?? []}))
  );

  constructor(private readonly store: Store<PartialState>, private readonly mediaService: MediaService) {
  }

  setSelectedBoat(boat?: Boat) {
    this.store.dispatch(BoatActions.setSelectedBoat({boat}));
  }

  create(boat: Boat) {
    this.store.dispatch(BoatActions.createBoat({boat}));
  }

  update(boat: Boat) {
    this.store.dispatch(BoatActions.updateBoat({boat}));
  }
}
