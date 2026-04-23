import { type FC } from 'react';
import { flexRender, type Header } from '@tanstack/react-table';

import { TableHead } from '@/shared/ui/table';

import type { ReportTypeDescriptor } from '../../api/types';

type HeaderCellProps = {
  header: Header<ReportTypeDescriptor, unknown>;
};

const HeaderCell: FC<HeaderCellProps> = ({ header }) => {
  if (header.isPlaceholder) return <TableHead />;
  return (
    <TableHead>
      {flexRender(header.column.columnDef.header, header.getContext())}
    </TableHead>
  );
};

export default HeaderCell;
