import type { Table } from '@tanstack/react-table';

import { TableHeader, TableRow } from '@/shared/ui/table';

import type { Report } from '@/entities/client';

import HeaderCell from './HeaderCell';

type TableHeaderRowsProps = {
  table: Table<Report>;
};

const TableHeaderRows = ({ table }: TableHeaderRowsProps) => {
  const groups = table.getHeaderGroups();
  return (
    <TableHeader>
      {groups.map((group) => (
        <TableRow key={group.id}>
          {group.headers.map((header) => (
            <HeaderCell key={header.id} header={header} />
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default TableHeaderRows;
