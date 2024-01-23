/**
 * Generic typescript utilities
 */

import { SortDirection } from "@angular/material/sort";

// remember the included ones in lib.es5.d.ts
// export type Readonly<T> = { readonly [P in keyof T]: T[P] };
// export type Nullable<T> = { [P in keyof T]: T[P] | null };
// export type Partial<T> = { [P in keyof T]?: T[P] };
// export type Pick<T, K extends keyof T> = { [P in K]: T[P] };
// export type Record<K extends string, T> = { [P in K]: T };

export interface Dictionary<T> {
  [key: string]: T;
}

/**
 * Application interfaces
 */

export type SelectOptions<T> = Array<{
  value: T;
  title: string;
}>;


export interface SortItem{
  active:string,
  direction:SortDirection
  }