import { type FC } from 'react';

import { H1, H2, InlineError, PageContent, Section } from '@/shared/UiKit';
import { ClientsTable } from '@/entities/client';

import { useIndexPage } from '../model/useIndexPage';

import MakeClientsReportButton from './MakeClientsReportButton';

const IndexPage: FC = () => {
  const { clients, onMakeClientsReport, makeReport } = useIndexPage();
  return (
    <PageContent>
      <H1>Dashboard</H1>
      <Section>
        <H2>Clients</H2>
        <div className="flex items-center gap-3">
          <MakeClientsReportButton
            onClick={onMakeClientsReport}
            isPending={makeReport.isPending}
          />
          <InlineError
            isError={makeReport.isError}
            error={makeReport.error}
            testId="make-clients-report-error"
          />
        </div>
      </Section>
      <ClientsTable state={clients} />
    </PageContent>
  );
};

export default IndexPage;
