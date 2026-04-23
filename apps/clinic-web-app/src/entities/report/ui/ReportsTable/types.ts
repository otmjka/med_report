import type { ColumnDef } from '@tanstack/react-table';

import type { GetReportsResponse, ReportListItem } from '../../api/types';

export type ReportsTableState = {
  data: GetReportsResponse | undefined;
  isLoading: boolean;
  displayError: unknown;
};

export type ReportsTableProps = {
  state: ReportsTableState;
};

export type InnerTableProps = {
  data: GetReportsResponse;
  columns: ColumnDef<ReportListItem>[];
};
