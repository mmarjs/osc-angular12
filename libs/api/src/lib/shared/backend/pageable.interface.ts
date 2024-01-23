import { SortDirection } from '@angular/material/sort';

// TODO test backend results

export interface Pageable {
  /* Page number requested. Default is 0 */
  page?: number;
  /* Number of records or size */
  size?: number;
  /* Sort field */
  sort?: string;
  /* Sort order */
  direction?: SortDirection; // 'asc' | 'desc';
}

export interface PageableWithoutDirection {
  /* Page number requested. Default is 0 */
  page?: number;
  /* Number of records or size */
  size?: number;
  /* Sort field */
  sort?: string;
}
