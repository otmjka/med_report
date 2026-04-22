import { type FC } from 'react';
import { Outlet } from 'react-router';

const Layout: FC = () => {
  return (
    <div data-testid="app-root" className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default Layout;
