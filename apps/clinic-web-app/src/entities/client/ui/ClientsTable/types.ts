import type { ColumnDef, Header, Row } from '@tanstack/react-table';

import type { Client, GetClientsResponse } from '../../api/types';

export type ClientsTableState = {
  data: GetClientsResponse | undefined;
  isLoading: boolean;
  displayError: unknown;
};

export type ClientsTableProps = {
  state: ClientsTableState;
};

export type InnerTableProps = {
  data: GetClientsResponse;
  columns: ColumnDef<Client>[];
};

export type HeaderCellProps = {
  header: Header<Client, unknown>;
};

export type BodyRowProps = {
  row: Row<Client>;
};

export type EmptyRowProps = {
  colSpan: number;
};
