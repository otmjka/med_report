import { type FC } from 'react';
import { Link } from 'react-router';

import { Button } from '@/shared/ui/button';

import ReportsSection from './ReportsSection';
import { useClientPage } from './useClientPage';

const ClientPage: FC = () => {
  const { clientItem, reportsItem, makeReport } = useClientPage();
  const { data, isLoading, isError, error } = clientItem;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
      <Link to="/clients" className="text-sm hover:underline">
        &larr; Back to clients
      </Link>
      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">{(error as Error).message}</p>}
      {data && (
        <>
          <div className="flex flex-col gap-4 rounded-md border p-4">
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground text-sm">#{data.id}</div>
              <h1 className="text-2xl font-semibold">{data.name}</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={makeReport.onClick}
                disabled={makeReport.isPending}
              >
                {makeReport.isPending ? 'Creating...' : 'Make report'}
              </Button>
              {makeReport.isSuccess && makeReport.data && (
                <span className="text-muted-foreground text-sm">
                  Run #{makeReport.data.runId} — {makeReport.data.status}
                </span>
              )}
              {makeReport.isError && (
                <span className="text-sm text-red-500">
                  {(makeReport.error as Error).message}
                </span>
              )}
            </div>
          </div>
          <ReportsSection
            data={reportsItem.data}
            isLoading={reportsItem.isLoading}
            isError={reportsItem.isError}
            error={reportsItem.error}
          />
        </>
      )}
    </div>
  );
};

export default ClientPage;
