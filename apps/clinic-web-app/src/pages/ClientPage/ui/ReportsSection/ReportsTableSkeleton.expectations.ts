import { screen } from '@testing-library/react';
import { expect } from 'vitest';

export const queryReportsTableSkeleton = () =>
  screen.queryByTestId('reports-table-skeleton');

export const expectReportsTableSkeletonVisible = () => {
  expect(queryReportsTableSkeleton()).toBeInTheDocument();
};

export const expectReportsTableSkeletonAbsent = () => {
  expect(queryReportsTableSkeleton()).not.toBeInTheDocument();
};
