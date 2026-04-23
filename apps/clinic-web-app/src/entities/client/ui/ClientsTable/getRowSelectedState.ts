import type { Row } from '@tanstack/react-table';

import type { Client } from '../../api/types';

export const getRowSelectedState = (row: Row<Client>) => {
  if (!row.getIsSelected()) return undefined;
  return 'selected' as const;
};
