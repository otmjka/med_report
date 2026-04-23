import { type FC } from 'react';

import InnerTable from './InnerTable';
import { reportsTableColumns } from '../../lib/reportsTableColumns';
import type { ReportsTableState } from './types';

type InnerTableSlotProps = {
  data: ReportsTableState['data'];
};

const InnerTableSlot: FC<InnerTableSlotProps> = ({ data }) => {
  if (!data) return null;
  return <InnerTable data={data} columns={reportsTableColumns} />;
};

export default InnerTableSlot;
