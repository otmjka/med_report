import { type FC } from 'react';

import { ErrorAlert, PageContent } from '@/shared/UiKit';

import { useClientPage } from '../model/useClientPage';

import BackLink from './BackLink';
import ClientCardSkeleton from './ClientCardSkeleton';
import ClientCardSlot from './ClientCardSlot';
import { ReportsSection } from './ReportsSection';

const ClientPage: FC = () => {
  const { client, reports, onMakeCosmofit, makeReport } = useClientPage();
  return (
    <PageContent>
      <BackLink />
      <ClientCardSkeleton isLoading={client.isLoading} />
      <ErrorAlert error={client.displayError} title="Failed to load client" />
      <ClientCardSlot
        data={client.data}
        onMakeCosmofit={onMakeCosmofit}
        makeReport={makeReport}
      />
      <ReportsSection state={reports} />
    </PageContent>
  );
};

export default ClientPage;
