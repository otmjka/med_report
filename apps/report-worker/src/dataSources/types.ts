export interface DataSource<TParams, TData> {
  fetch(params: TParams): Promise<TData>;
}

export type PostgresFetchParams = {
  clientId: number;
};

export type PostgresClientRow = {
  id: number;
  name: string;
};

export type HttpFetchParams = {
  userId: number;
};

export type HttpLabResult = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type MockFetchParams = {
  fixtureName: string;
};

export type MockCosmofitSample = {
  clientId: number;
  measurements: Array<{ key: string; value: number; unit: string }>;
};
