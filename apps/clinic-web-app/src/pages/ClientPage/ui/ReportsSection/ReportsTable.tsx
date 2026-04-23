import { type FC } from 'react';

import { ErrorAlert } from '@/shared/UiKit';

import InnerTableSlot from './InnerTableSlot';
import ReportsTableSkeleton from './ReportsTableSkeleton';
import type { ReportsTableProps } from './types';

const ReportsTable: FC<ReportsTableProps> = ({ state }) => {
  const { data, isLoading, displayError } = state;
  return (
    <>
      <ReportsTableSkeleton isLoading={isLoading} />
      <ErrorAlert error={displayError} title="Failed to load reports" />
      <InnerTableSlot data={data} />
    </>
  );
};

export default ReportsTable;
