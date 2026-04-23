import { type FC } from 'react';

import { Skeleton } from '@/shared/ui/skeleton';

const ROWS = 3;

type ReportsTableSkeletonProps = {
  isLoading: boolean;
};

const ReportsTableSkeleton: FC<ReportsTableSkeletonProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div
      data-testid="reports-table-skeleton"
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

export default ReportsTableSkeleton;
