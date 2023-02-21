import { Status } from '@core/enums/status';
import { Id } from '@core/utils/custom-types';
export interface Basic {
  id: Id;
  created: number;
  modified: number;
  status: Status;
}
