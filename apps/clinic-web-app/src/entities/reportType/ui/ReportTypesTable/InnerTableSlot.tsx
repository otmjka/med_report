import { type FC } from 'react';

import InnerTable from './InnerTable';
import { reportTypesTableColumns } from './reportTypesTableColumns';
import type { ReportTypesTableState } from './types';

type InnerTableSlotProps = {
  data: ReportTypesTableState['data'];
};

const InnerTableSlot: FC<InnerTableSlotProps> = ({ data }) => {
  if (!data) return null;
  return <InnerTable data={data} columns={reportTypesTableColumns} />;
};

export default InnerTableSlot;
