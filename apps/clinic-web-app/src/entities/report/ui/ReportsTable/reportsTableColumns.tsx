import type { ColumnDef } from '@tanstack/react-table';

import type { ReportListItem } from '../../api/types';

import ClientLinkCell from './ClientLinkCell';
import CreatedAtCell from './CreatedAtCell';
import ResultLinkCell from './ResultLinkCell';

export const reportsTableColumns: ColumnDef<ReportListItem>[] = [
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => <CreatedAtCell createdAt={row.original.created_at} />,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <code className="text-xs">{row.original.type}</code>,
  },
  {
    accessorKey: 'client_name',
    header: 'Client',
    cell: ({ row }) => (
      <ClientLinkCell
        clientId={row.original.client_id}
        clientName={row.original.client_name}
      />
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'result_url',
    header: 'Result',
    cell: ({ row }) => <ResultLinkCell resultUrl={row.original.result_url} />,
  },
];
