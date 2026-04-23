import { type FC } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table } from '@/shared/ui/table';

import TableBodyRows from './TableBodyRows';
import TableHeaderRows from './TableHeaderRows';
import type { InnerTableProps } from './types';

const InnerTable: FC<InnerTableProps> = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div data-testid="reports-table" className="overflow-hidden rounded-md border">
      <Table>
        <TableHeaderRows table={table} />
        <TableBodyRows table={table} colSpan={columns.length} />
      </Table>
    </div>
  );
};

export default InnerTable;
