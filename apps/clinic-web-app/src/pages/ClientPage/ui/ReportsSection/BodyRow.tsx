import { type FC } from 'react';

import { TableRow } from '@/shared/ui/table';

import BodyCell from './BodyCell';
import type { BodyRowProps } from './types';

const BodyRow: FC<BodyRowProps> = ({ row }) => {
  const cells = row.getVisibleCells();
  return (
    <TableRow>
      {cells.map((cell) => (
        <BodyCell key={cell.id} cell={cell} />
      ))}
    </TableRow>
  );
};

export default BodyRow;
