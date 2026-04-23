import { screen } from '@testing-library/react';
import { expect } from 'vitest';

export const queryClientsTableSkeleton = () =>
  screen.queryByTestId('clients-table-skeleton');

export const expectClientsTableSkeletonVisible = () => {
  expect(queryClientsTableSkeleton()).toBeInTheDocument();
};

export const expectClientsTableSkeletonAbsent = () => {
  expect(queryClientsTableSkeleton()).not.toBeInTheDocument();
};
