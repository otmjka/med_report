import { type FC } from 'react';
import { type Row } from '@tanstack/react-table';

import { TableRow } from '@/shared/ui/table';

import type { ReportTypeDescriptor } from '../../api/types';

import BodyCell from './BodyCell';

type BodyRowProps = {
  row: Row<ReportTypeDescriptor>;
};

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
