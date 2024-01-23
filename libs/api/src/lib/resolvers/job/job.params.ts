import { JobDTO } from '@ocean/api/shared';

export interface JobParams {
  item: JobDTO;
  readonly?: boolean;
}
