import { type FC } from 'react';

import { TableCell, TableRow } from '@/shared/ui/table';

type EmptyRowProps = {
  colSpan: number;
};

const EmptyRow: FC<EmptyRowProps> = ({ colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-24 text-center">
        No reports yet.
      </TableCell>
    </TableRow>
  );
};

export default EmptyRow;
