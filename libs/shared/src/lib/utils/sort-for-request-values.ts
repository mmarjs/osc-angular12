import { MatSort } from '@angular/material/sort';

export const sortForRequestValues = (values: (string | number | null | undefined)[] | MatSort): string => {
  if (values instanceof MatSort) {
    values = [values.active, values.direction];
  }

  return values
    .filter(value =>
      (typeof value === 'string' && value.length !== 0) ||
      (typeof value === 'number' && value >= 0)
    )
    .join(',');
};
