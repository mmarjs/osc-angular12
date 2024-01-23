import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { sortForRequestValues } from '@ocean/shared/utils/sort-for-request-values';

export function getterPaginator(paginator: MatPaginator) {
  return (pageSize: number) => {
    return () => ({
      pageable: {
        page: paginator ? paginator.pageIndex : 0,
        size: paginator ? paginator.pageSize : pageSize,
      },
    });
  };
}

export function getterSort(sorter: MatSort) {
  return () => {
    if (!sorter || typeof sorter?.active !== 'string') {
      return {};
    }

    return {
      pageable: {
        sort: sortForRequestValues(sorter)
      }
    };
  };
}
