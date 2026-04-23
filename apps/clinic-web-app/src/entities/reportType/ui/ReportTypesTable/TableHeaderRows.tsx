import { type FC } from 'react';
import { type Table } from '@tanstack/react-table';

import { TableHeader, TableRow } from '@/shared/ui/table';

import type { ReportTypeDescriptor } from '../../api/types';

import HeaderCell from './HeaderCell';

type TableHeaderRowsProps = {
  table: Table<ReportTypeDescriptor>;
};

const TableHeaderRows: FC<TableHeaderRowsProps> = ({ table }) => {
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
