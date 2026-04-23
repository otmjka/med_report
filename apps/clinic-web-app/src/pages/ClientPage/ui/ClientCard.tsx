import { type FC } from 'react';

import type { GetClientResponse } from '@/entities/client';
import type { CreateReportResponse } from '@/shared/api';
import { InlineError } from '@/shared/UiKit';

import ClientCardHeader from './ClientCardHeader';
import MakeCosmofitButton from './MakeCosmofitButton';
import MakeReportStatus from './MakeReportStatus';

type ClientCardProps = {
  client: GetClientResponse;
  onMakeCosmofit: () => void;
  makeReport: {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: unknown;
    data: CreateReportResponse | undefined;
  };
};

const ClientCard: FC<ClientCardProps> = ({
  client,
  onMakeCosmofit,
  makeReport,
}) => {
  return (
    <div data-testid="client-card" className="flex flex-col gap-4 rounded-md border p-4">
      <ClientCardHeader client={client} />
      <div className="flex items-center gap-3">
        <MakeCosmofitButton
          onClick={onMakeCosmofit}
          isPending={makeReport.isPending}
        />
        <MakeReportStatus
          isSuccess={makeReport.isSuccess}
          data={makeReport.data}
        />
        <InlineError
          isError={makeReport.isError}
          error={makeReport.error}
          testId="make-report-error"
        />
      </div>
    </div>
  );
};

export default ClientCard;
