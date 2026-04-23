import { type FC } from 'react';
import { flexRender } from '@tanstack/react-table';

import { TableCell } from '@/shared/ui/table';

import type { BodyCellProps } from './types';

const BodyCell: FC<BodyCellProps> = ({ cell }) => {
  return (
    <TableCell>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default BodyCell;
