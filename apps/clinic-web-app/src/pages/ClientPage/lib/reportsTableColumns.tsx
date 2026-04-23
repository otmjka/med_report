import type { ColumnDef } from '@tanstack/react-table';

import type { Report } from '@/entities/client';
import apiUrls from '@/shared/api/apiUrls';

import { formatDateTime } from './formatDateTime';

export const reportsTableColumns: ColumnDef<Report>[] = [
  {
    accessorKey: 'id',
    header: 'Run',
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.id}</span>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => formatDateTime(row.original.created_at),
  },
  {
    accessorKey: 'finished_at',
    header: 'Finished',
    cell: ({ row }) => formatDateTime(row.original.finished_at),
  },
  {
    id: 'result',
    header: 'Result',
    cell: ({ row }) => {
      const url = row.original.result_url;
      if (!url) return '—';
      const href = url.startsWith('http') ? url : `${apiUrls.baseUrl}${url}`;
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Open
        </a>
      );
    },
  },
];
