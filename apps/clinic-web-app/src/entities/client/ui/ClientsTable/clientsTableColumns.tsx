import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';

import type { Client } from '../../api/types';

export const clientsTableColumns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      const id = row.original.id;
      return (
        <Link to={`/clients/${id}`} className="font-medium hover:underline">
          {name}
        </Link>
      );
    },
  },
];
