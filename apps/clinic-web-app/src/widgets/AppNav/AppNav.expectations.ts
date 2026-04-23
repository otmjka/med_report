import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

export const getAppNav = () => screen.getByTestId('app-nav');
export const getClientsLink = () => screen.getByTestId('app-nav-clients');

export const expectAppNavVisible = () => {
  expect(getAppNav()).toBeInTheDocument();
  const clients = getClientsLink();
  expect(clients).toHaveTextContent('Clients');
  expect(clients).toHaveAttribute('href', '/clients');
};

export const clickClientsLink = async () => {
  await userEvent.click(getClientsLink());
};
