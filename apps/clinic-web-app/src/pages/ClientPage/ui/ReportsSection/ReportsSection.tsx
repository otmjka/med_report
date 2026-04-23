import { type FC } from 'react';

import { H2 } from '@/shared/UiKit';

import ReportsTable from './ReportsTable';
import type { ReportsTableState } from './types';

type ReportsSectionProps = {
  state: ReportsTableState;
};

const ReportsSection: FC<ReportsSectionProps> = ({ state }) => {
  return (
    <div className="flex flex-col gap-2">
      <H2>Reports history</H2>
      <ReportsTable state={state} />
    </div>
  );
};

export default ReportsSection;
