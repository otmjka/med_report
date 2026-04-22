import { type FC } from 'react';

import type { Report } from '@/shared/api';

import { ReportsTable } from './ReportsTable';
import { reportsTableColumns } from './reportsTableColumns';

type Props = {
  data: Report[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
};

const ReportsSection: FC<Props> = ({ data, isLoading, isError, error }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Reports history</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">{(error as Error).message}</p>}
      {data && <ReportsTable columns={reportsTableColumns} data={data} />}
    </div>
  );
};

export default ReportsSection;
