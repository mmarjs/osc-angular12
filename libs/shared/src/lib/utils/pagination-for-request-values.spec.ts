import { paginationForRequestValues } from '@ocean/shared/utils/pagination-for-request-values';
import { DEFAULT_PAGINATOR_MIN_PAGE, DEFAULT_PAGINATOR_PAGE_SIZE } from '@ocean/shared/constants/paginator';

describe('paginationForRequestValues', () => {
  it('default values', () => {
    const result = paginationForRequestValues();
    expect(result).toEqual({
      page: DEFAULT_PAGINATOR_MIN_PAGE,
      size: DEFAULT_PAGINATOR_PAGE_SIZE
    });
  });

  it('no negative values', () => {
    const result = paginationForRequestValues({
      page: -1,
      size: -5
    });
    expect(result).toEqual({
      page: DEFAULT_PAGINATOR_MIN_PAGE,
      size: DEFAULT_PAGINATOR_PAGE_SIZE
    });
  });
});
