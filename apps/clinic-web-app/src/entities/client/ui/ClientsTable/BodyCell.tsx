import { flexRender, type Cell } from '@tanstack/react-table';

import { TableCell } from '@/shared/ui/table';

import type { Client } from '../../api/types';

type BodyCellProps = {
  cell: Cell<Client, unknown>;
};

const BodyCell = ({ cell }: BodyCellProps) => {
  return (
    <TableCell>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default BodyCell;
