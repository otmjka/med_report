import { type FC } from 'react';

import { Button } from '@/shared/ui/button';

type MakeCosmofitButtonProps = {
  onClick: () => void;
  isPending: boolean;
};

const MakeCosmofitButton: FC<MakeCosmofitButtonProps> = ({
  onClick,
  isPending,
}) => {
  if (isPending) {
    return (
      <Button data-testid="make-cosmofit" disabled>
        Creating...
      </Button>
    );
  }
  return (
    <Button data-testid="make-cosmofit" onClick={onClick}>
      Make cosmofit (PDF)
    </Button>
  );
};

export default MakeCosmofitButton;
