import { type FC } from 'react';
import { Link } from 'react-router';

const Logo: FC = () => {
  return (
    <Link
      data-testid="header-logo"
      to="/"
      className="py-2 px-3 text-lg font-bold hover:opacity-80 bg-blue-400"
    >
      Med-a-Med
    </Link>
  );
};

export default Logo;
