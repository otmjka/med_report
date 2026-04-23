import { screen, within } from '@testing-library/react';
import { expect } from 'vitest';

export const queryReportsTable = () => screen.queryByTestId('reports-table');
export const getReportsTable = () => screen.getByTestId('reports-table');

export const expectReportsTableAbsent = () => {
  expect(queryReportsTable()).not.toBeInTheDocument();
};

export const expectReportsTableEmpty = () => {
  expect(within(getReportsTable()).getByText('No reports yet.')).toBeInTheDocument();
};

export const expectReportsTableHasRow = (id: string) => {
  expect(within(getReportsTable()).getByText(id)).toBeInTheDocument();
};
