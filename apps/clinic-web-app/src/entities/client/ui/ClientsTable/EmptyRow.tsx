import { type FC } from 'react';

import { TableCell, TableRow } from '@/shared/ui/table';

import type { EmptyRowProps } from './types';

const EmptyRow: FC<EmptyRowProps> = ({ colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};

export default EmptyRow;
