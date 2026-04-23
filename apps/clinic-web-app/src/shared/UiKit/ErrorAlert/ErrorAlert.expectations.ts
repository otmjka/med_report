import { screen } from '@testing-library/react';
import { expect } from 'vitest';

export const queryErrorAlert = () => screen.queryByTestId('error-alert');
export const getErrorAlert = () => screen.getByTestId('error-alert');

export const expectErrorAlertVisible = (message: string, title?: string) => {
  const alert = getErrorAlert();
  expect(alert).toBeInTheDocument();
  expect(alert).toHaveTextContent(message);
  if (title) expect(alert).toHaveTextContent(title);
};

export const expectErrorAlertAbsent = () => {
  expect(queryErrorAlert()).not.toBeInTheDocument();
};
