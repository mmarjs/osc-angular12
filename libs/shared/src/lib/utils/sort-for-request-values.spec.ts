import { sortForRequestValues } from '@ocean/shared/utils/sort-for-request-values';
import { MatSort } from '@angular/material/sort';

describe('sortForRequestValues', () => {
  it('default value', () => {
    const result = sortForRequestValues([]);
    expect(result).toEqual('');
  });

  it('skip null & undefined values', () => {
    const result = sortForRequestValues(['sort', null, 'asc', undefined, 0, null, 45]);
    expect(result).toEqual('sort,asc,0,45');
  });

  it('no negatives values', () => {
    const result = sortForRequestValues(['sort', null, 'asc', undefined, -50, null, 45]);
    expect(result).toEqual('sort,asc,45');
  });

  it('values should have length', () => {
    const result = sortForRequestValues(['', null, 'asc', undefined, '', null]);
    expect(result).toEqual('asc');
  });

  it('supports MatSort', () => {
    const sorter: MatSort = new MatSort();
    sorter.sort({
      id: 'pages',
      start: 'asc',
      disableClear: false
    });

    const result = sortForRequestValues(sorter);
    expect(result).toEqual('pages,asc');
  });
});
