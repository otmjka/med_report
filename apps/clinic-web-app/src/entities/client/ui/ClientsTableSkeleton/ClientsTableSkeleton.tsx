import { type FC } from 'react';

import { Skeleton } from '@/shared/ui/skeleton';

const ROWS = 5;

type ClientsTableSkeletonProps = {
  isLoading: boolean;
};

const ClientsTableSkeleton: FC<ClientsTableSkeletonProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div
      data-testid="clients-table-skeleton"
      className="flex flex-col gap-2"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-8 w-full" />
      {Array.from({ length: ROWS }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
};

export default ClientsTableSkeleton;
