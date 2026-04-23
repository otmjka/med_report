import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

export const getMakeClientsReportButton = () =>
  screen.getByTestId('make-clients-report');

export const expectMakeClientsReportEnabled = () => {
  const btn = getMakeClientsReportButton();
  expect(btn).toBeEnabled();
  expect(btn).toHaveTextContent('Make clients summary (XLSX)');
};

export const expectMakeClientsReportPending = () => {
  const btn = getMakeClientsReportButton();
  expect(btn).toBeDisabled();
  expect(btn).toHaveTextContent('Creating...');
};

export const clickMakeClientsReport = async () => {
  await userEvent.click(getMakeClientsReportButton());
};
