import { Pageable } from '@ocean/api/shared';
import { DEFAULT_PAGINATOR_MIN_PAGE, DEFAULT_PAGINATOR_PAGE_SIZE } from '@ocean/shared/constants/paginator';

export const paginationForRequestValues = (pageable?: Pageable) => ({
  page: Math.max(DEFAULT_PAGINATOR_MIN_PAGE, pageable?.page ?? DEFAULT_PAGINATOR_MIN_PAGE),
  size: Math.max(DEFAULT_PAGINATOR_PAGE_SIZE, pageable?.size ?? DEFAULT_PAGINATOR_PAGE_SIZE)
});
