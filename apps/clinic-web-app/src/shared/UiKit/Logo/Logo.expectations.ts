import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

export const getLogo = () => screen.getByTestId('header-logo');

export const expectLogoVisible = () => {
  const logo = getLogo();
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveTextContent('Med-a-Med');
  expect(logo).toHaveAttribute('href', '/');
};

export const clickLogo = async () => {
  await userEvent.click(getLogo());
};
