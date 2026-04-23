import { type FC } from 'react';
import { flexRender } from '@tanstack/react-table';

import { TableHead } from '@/shared/ui/table';

import type { HeaderCellProps } from './types';

const HeaderCell: FC<HeaderCellProps> = ({ header }) => {
  if (header.isPlaceholder) return <TableHead />;
  return (
    <TableHead>
      {flexRender(header.column.columnDef.header, header.getContext())}
    </TableHead>
  );
};

export default HeaderCell;
