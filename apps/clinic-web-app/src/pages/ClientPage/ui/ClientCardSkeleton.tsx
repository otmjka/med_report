import { type FC } from 'react';

import { Skeleton } from '@/shared/ui/skeleton';

type ClientCardSkeletonProps = {
  isLoading: boolean;
};

const ClientCardSkeleton: FC<ClientCardSkeletonProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div
      data-testid="client-card-skeleton"
      className="flex flex-col gap-4 rounded-md border p-4"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-9 w-48" />
    </div>
  );
};

export default ClientCardSkeleton;
