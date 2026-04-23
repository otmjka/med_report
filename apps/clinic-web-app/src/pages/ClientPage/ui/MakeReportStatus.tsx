import { type FC } from 'react';

import type { CreateReportResponse } from '@/shared/api';

type MakeReportStatusProps = {
  isSuccess: boolean;
  data: CreateReportResponse | undefined;
};

const MakeReportStatus: FC<MakeReportStatusProps> = ({ isSuccess, data }) => {
  if (!isSuccess || !data) return null;
  return (
    <span data-testid="make-report-status" className="text-muted-foreground text-sm">
      Run #{data.runId} — {data.status}
    </span>
  );
};

export default MakeReportStatus;
