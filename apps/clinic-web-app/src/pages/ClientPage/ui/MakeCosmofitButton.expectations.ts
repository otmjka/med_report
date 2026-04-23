import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

export const getMakeCosmofitButton = () => screen.getByTestId('make-cosmofit');
export const queryMakeCosmofitButton = () =>
  screen.queryByTestId('make-cosmofit');

export const expectMakeCosmofitEnabled = () => {
  const btn = getMakeCosmofitButton();
  expect(btn).toBeEnabled();
  expect(btn).toHaveTextContent('Make cosmofit (PDF)');
};

export const expectMakeCosmofitPending = () => {
  const btn = getMakeCosmofitButton();
  expect(btn).toBeDisabled();
  expect(btn).toHaveTextContent('Creating...');
};

export const expectMakeCosmofitAbsent = () => {
  expect(queryMakeCosmofitButton()).not.toBeInTheDocument();
};

export const clickMakeCosmofit = async () => {
  await userEvent.click(getMakeCosmofitButton());
};
