import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import ClientsTableSkeleton from './ClientsTableSkeleton';
import {
  expectClientsTableSkeletonAbsent,
  expectClientsTableSkeletonVisible,
} from './ClientsTableSkeleton.expectations';

describe('ClientsTableSkeleton', () => {
  it('renders nothing when not loading', () => {
    render(<ClientsTableSkeleton isLoading={false} />);
    expectClientsTableSkeletonAbsent();
  });

  it('renders skeleton when loading', () => {
    render(<ClientsTableSkeleton isLoading />);
    expectClientsTableSkeletonVisible();
  });
});
