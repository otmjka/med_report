import { type FC } from 'react';
import { Outlet } from 'react-router';

import { AppNav } from '@/widgets/AppNav';

import Header from './Header/Header';
import Logo from './Logo/Logo';

const Layout: FC = () => {
  return (
    <div data-testid="app-root" className="min-h-screen">
      <Header>
        <Logo />
        <AppNav />
      </Header>
      <Outlet />
    </div>
  );
};

export default Layout;
