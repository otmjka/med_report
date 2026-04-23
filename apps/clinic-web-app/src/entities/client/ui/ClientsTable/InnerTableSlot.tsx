import { type FC } from 'react';

import InnerTable from './InnerTable';
import { clientsTableColumns } from './clientsTableColumns';
import type { ClientsTableState } from './types';

type InnerTableSlotProps = {
  data: ClientsTableState['data'];
};

const InnerTableSlot: FC<InnerTableSlotProps> = ({ data }) => {
  if (!data) return null;
  return <InnerTable data={data} columns={clientsTableColumns} />;
};

export default InnerTableSlot;
