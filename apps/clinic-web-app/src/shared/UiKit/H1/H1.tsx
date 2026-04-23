import { type FC, type ReactNode } from 'react';

type H1Props = {
  children: ReactNode;
};

const H1: FC<H1Props> = ({ children }) => {
  return (
    <h1 data-testid="h1" className="text-2xl font-semibold">
      {children}
    </h1>
  );
};

export default H1;
