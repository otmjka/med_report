import { type FC, type ReactNode } from 'react';

type H2Props = {
  children: ReactNode;
};

const H2: FC<H2Props> = ({ children }) => {
  return (
    <h2 data-testid="h2" className="text-lg font-semibold">
      {children}
    </h2>
  );
};

export default H2;
