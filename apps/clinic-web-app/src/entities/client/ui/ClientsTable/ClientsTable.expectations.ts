import { screen, within } from '@testing-library/react';
import { expect } from 'vitest';

export const queryClientsTable = () => screen.queryByTestId('clients-table');
export const getClientsTable = () => screen.getByTestId('clients-table');

export const expectClientsTableAbsent = () => {
  expect(queryClientsTable()).not.toBeInTheDocument();
};

export const expectClientsTableHasRows = (names: string[]) => {
  const table = getClientsTable();
  for (const name of names) {
    expect(within(table).getByText(name)).toBeInTheDocument();
  }
};

export const expectClientsTableEmpty = () => {
  const table = getClientsTable();
  expect(within(table).getByText('No results.')).toBeInTheDocument();
};
