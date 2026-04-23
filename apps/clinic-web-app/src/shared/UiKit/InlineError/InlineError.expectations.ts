import { screen } from '@testing-library/react';
import { expect } from 'vitest';

export const queryInlineError = (testId = 'inline-error') =>
  screen.queryByTestId(testId);

export const expectInlineErrorAbsent = (testId = 'inline-error') => {
  expect(queryInlineError(testId)).not.toBeInTheDocument();
};

export const expectInlineErrorText = (text: string, testId = 'inline-error') => {
  const node = queryInlineError(testId);
  expect(node).toBeInTheDocument();
  expect(node).toHaveTextContent(text);
};
