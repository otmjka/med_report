import { type FC } from 'react';
import { type Table } from '@tanstack/react-table';

import { TableBody } from '@/shared/ui/table';

import type { ReportTypeDescriptor } from '../../api/types';

import BodyRow from './BodyRow';
import EmptyRow from './EmptyRow';

type TableBodyRowsProps = {
  table: Table<ReportTypeDescriptor>;
  colSpan: number;
};

const TableBodyRows: FC<TableBodyRowsProps> = ({ table, colSpan }) => {
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
