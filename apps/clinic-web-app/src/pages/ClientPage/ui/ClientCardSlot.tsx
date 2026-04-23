import { type FC } from 'react';

import type { GetClientResponse } from '@/entities/client';
import type { CreateReportResponse } from '@/shared/api';

import ClientCard from './ClientCard';

type ClientCardSlotProps = {
  data: GetClientResponse | undefined;
  onMakeCosmofit: () => void;
  makeReport: {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: unknown;
    data: CreateReportResponse | undefined;
  };
};

const ClientCardSlot: FC<ClientCardSlotProps> = ({
  data,
  onMakeCosmofit,
  makeReport,
}) => {
  if (!data) return null;
  return (
    <ClientCard
      client={data}
      onMakeCosmofit={onMakeCosmofit}
      makeReport={makeReport}
    />
  );
};

export default ClientCardSlot;
