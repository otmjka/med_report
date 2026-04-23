import { type FC } from 'react';

import { ErrorAlert } from '@/shared/UiKit';

import { ReportTypesTableSkeleton } from '../ReportTypesTableSkeleton';

import InnerTableSlot from './InnerTableSlot';
import type { ReportTypesTableProps } from './types';

const ReportTypesTable: FC<ReportTypesTableProps> = ({ state }) => {
  const { data, isLoading, displayError } = state;
  return (
    <>
      <ReportTypesTableSkeleton isLoading={isLoading} />
      <ErrorAlert error={displayError} title="Failed to load report types" />
      <InnerTableSlot data={data} />
    </>
  );
};

export default ReportTypesTable;
