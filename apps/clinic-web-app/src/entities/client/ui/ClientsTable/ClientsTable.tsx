import { type FC } from 'react';

import { ErrorAlert } from '@/shared/UiKit';

import { ClientsTableSkeleton } from '../ClientsTableSkeleton';

import InnerTableSlot from './InnerTableSlot';
import type { ClientsTableProps } from './types';

const ClientsTable: FC<ClientsTableProps> = ({ state }) => {
  const { data, isLoading, displayError } = state;
  return (
    <>
      <ClientsTableSkeleton isLoading={isLoading} />
      <ErrorAlert error={displayError} title="Failed to load clients" />
      <InnerTableSlot data={data} />
    </>
  );
};

export default ClientsTable;
