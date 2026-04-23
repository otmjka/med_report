import type { ColumnDef, Header, Row, Cell } from '@tanstack/react-table';

import type { Report } from '@/entities/client';

export type ReportsTableState = {
  data: Report[] | undefined;
  isLoading: boolean;
  displayError: unknown;
};

export type ReportsTableProps = {
  state: ReportsTableState;
};

export type InnerTableProps = {
  data: Report[];
  columns: ColumnDef<Report>[];
};

export type HeaderCellProps = {
  header: Header<Report, unknown>;
};

export type BodyRowProps = {
  row: Row<Report>;
};

export type BodyCellProps = {
  cell: Cell<Report, unknown>;
};

export type EmptyRowProps = {
  colSpan: number;
};
