import { type FC } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getClients } from '@/shared/api';

import { ClientsTable } from './ClientsTable';
import { clientsTableColumns } from './clientsTableColumns';

const ClientsPage: FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Clients</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">{(error as Error).message}</p>}
      {data && <ClientsTable columns={clientsTableColumns} data={data} />}
    </div>
  );
};

export default ClientsPage;
