import { AxiosPromise } from 'axios';
import { from as fromPromise, of as obsOf } from 'rxjs';
import { AxiosObservable } from './observable.interface';

export const from = <T = any>(promise: AxiosPromise<T>): AxiosObservable<T> => {
  return fromPromise(promise);
};

export const of = <T = any>(value: any): AxiosObservable<T> => {
  return obsOf(value);
};
