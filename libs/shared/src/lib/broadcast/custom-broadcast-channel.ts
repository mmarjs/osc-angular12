import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BroadcastChannelData } from './types';

type Types = BroadcastChannelData['type'];
type Data<T> = Extract<BroadcastChannelData, { type: T }>['data'];

@Injectable({
  providedIn: 'root',
})
export class CustomBroadcastChannel implements OnDestroy {
  private readonly channel = new BroadcastChannel('shared-context');
  private readonly subject = new Subject<BroadcastChannelData>();

  constructor(private readonly ngZone: NgZone) {
    this.channel.onmessage = ({ data }) => {
      const { type, data: raw } = data as BroadcastChannelData;
      this.subject.next(this.toBroadcastData(type, raw));
    };
  }

  private toBroadcastData<T extends Types>(type: T, data: Data<T>) {
    return { type, data };
  }

  private inZone<T extends Types, D extends Data<T>>(zone: NgZone) {
    return (source) => {
      return new Observable((observer) => {
        const onNext = (value: D) => zone.run(() => observer.next(value));
        const onError = (e: unknown) => zone.run(() => observer.error(e));
        const onComplete = () => zone.run(() => observer.complete());
        return source.subscribe(onNext, onError, onComplete);
      });
    };
  }

  send<T extends Types>(type: T, data: Data<T>, latency = 0) {
    setTimeout(() => {
      this.channel.postMessage(this.toBroadcastData(type, data));
    }, latency);
  }

  each() {
    return this.subject.pipe(this.inZone(this.ngZone));
  }

  only<T extends Types>(
    channel: T
  ): Observable<Extract<BroadcastChannelData, { type: T }>> {
    // Using Extract requires ts-ignore as filter can't give pure return type despite types / logic is correct
    // @ts-ignore
    return this.subject.pipe(
      filter(({ type }) => type === channel),
      this.inZone(this.ngZone)
    );
  }

  ngOnDestroy() {
    this.channel.close();
    this.subject.complete();
  }
}
