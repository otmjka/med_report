import { screen } from '@testing-library/react';
import { expect } from 'vitest';

export const getH2 = () => screen.getByTestId('h2');

export const expectH2Text = (text: string) => {
  expect(getH2()).toHaveTextContent(text);
};
