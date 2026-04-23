import { type FC } from 'react';
import { Link } from 'react-router';

const AppNav: FC = () => {
  return (
    <nav data-testid="app-nav" className="flex-1 flex items-center">
      <Link
        data-testid="app-nav-clients"
        to="/clients"
        className="py-3 text-lg hover:opacity-80 hover:underline"
      >
        Clients
      </Link>
    </nav>
  );
};

export default AppNav;
