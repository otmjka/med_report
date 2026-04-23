import { type FC } from 'react';

import { H1, PageContent } from '@/shared/UiKit';
import { ClientsTable } from '@/entities/client';

import { useClientsPage } from '../model/useClientsPage';

const ClientsPage: FC = () => {
  const { clients } = useClientsPage();
  return (
    <PageContent>
      <H1>Clients</H1>
      <ClientsTable state={clients} />
    </PageContent>
  );
};

export default ClientsPage;
