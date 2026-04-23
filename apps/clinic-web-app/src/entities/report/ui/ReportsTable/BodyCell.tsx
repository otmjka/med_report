import { type FC } from 'react';
import { flexRender, type Cell } from '@tanstack/react-table';

import { TableCell } from '@/shared/ui/table';

import type { ReportListItem } from '../../api/types';

type BodyCellProps = {
  cell: Cell<ReportListItem, unknown>;
};

const BodyCell: FC<BodyCellProps> = ({ cell }) => {
  return (
    <TableCell>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default BodyCell;
