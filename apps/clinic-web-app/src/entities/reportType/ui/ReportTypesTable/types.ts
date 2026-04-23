import type { ColumnDef } from '@tanstack/react-table';

import type {
  GetReportTypesResponse,
  ReportTypeDescriptor,
} from '../../api/types';

export type ReportTypesTableState = {
  data: GetReportTypesResponse | undefined;
  isLoading: boolean;
  displayError: unknown;
};

export type ReportTypesTableProps = {
  state: ReportTypesTableState;
};

export type InnerTableProps = {
  data: GetReportTypesResponse;
  columns: ColumnDef<ReportTypeDescriptor>[];
};
