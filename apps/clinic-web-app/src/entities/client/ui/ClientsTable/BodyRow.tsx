import { type FC } from 'react';

import { TableRow } from '@/shared/ui/table';

import BodyCell from './BodyCell';
import { getRowSelectedState } from './getRowSelectedState';
import type { BodyRowProps } from './types';

const BodyRow: FC<BodyRowProps> = ({ row }) => {
  const cells = row.getVisibleCells();
  return (
    <TableRow data-state={getRowSelectedState(row)}>
      {cells.map((cell) => (
        <BodyCell key={cell.id} cell={cell} />
      ))}
    </TableRow>
  );
};

export default BodyRow;
