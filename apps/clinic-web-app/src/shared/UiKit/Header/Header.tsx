import { type FC, type ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header
      data-testid="header"
      className="sticky top-0 z-50 border-b py-1 px-6 flex gap-6 h-12 bg-blue-200"
    >
      {children}
    </header>
  );
};

export default Header;
