import type { Table } from '@tanstack/react-table';

import { TableBody } from '@/shared/ui/table';

import BodyRow from './BodyRow';
import EmptyRow from './EmptyRow';
import type { Client } from '../../api/types';

type TableBodyRowsProps = {
  table: Table<Client>;
  colSpan: number;
};

const TableBodyRows = ({ table, colSpan }: TableBodyRowsProps) => {
  const rows = table.getRowModel().rows;
  if (rows.length === 0) {
    return (
      <TableBody>
        <EmptyRow colSpan={colSpan} />
      </TableBody>
    );
  }
  return (
    <TableBody>
      {rows.map((row) => (
        <BodyRow key={row.id} row={row} />
      ))}
    </TableBody>
  );
};

export default TableBodyRows;
