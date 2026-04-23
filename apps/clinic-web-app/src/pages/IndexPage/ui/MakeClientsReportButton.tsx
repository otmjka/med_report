import { type FC } from 'react';

import { Button } from '@/shared/ui/button';

type MakeClientsReportButtonProps = {
  onClick: () => void;
  isPending: boolean;
};

const MakeClientsReportButton: FC<MakeClientsReportButtonProps> = ({
  onClick,
  isPending,
}) => {
  if (isPending) {
    return (
      <Button data-testid="make-clients-report" disabled>
        Creating...
      </Button>
    );
  }
  return (
    <Button data-testid="make-clients-report" onClick={onClick}>
      Make clients summary (XLSX)
    </Button>
  );
};

export default MakeClientsReportButton;
