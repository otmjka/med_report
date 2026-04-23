import type { ColumnDef } from '@tanstack/react-table';

import type { ReportTypeDescriptor } from '../../api/types';

export const reportTypesTableColumns: ColumnDef<ReportTypeDescriptor>[] = [
  {
    accessorKey: 'label',
    header: 'Name',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <code className="text-xs">{row.original.type}</code>
    ),
  },
  {
    accessorKey: 'format',
    header: 'Format',
    cell: ({ row }) => row.original.format.toUpperCase(),
  },
  {
    accessorKey: 'requiresClient',
    header: 'Scope',
    cell: ({ row }) => (row.original.requiresClient ? 'Per client' : 'Global'),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.description}</span>
    ),
  },
];
