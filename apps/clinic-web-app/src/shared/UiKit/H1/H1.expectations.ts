import { screen } from '@testing-library/react';
import { expect } from 'vitest';

export const getH1 = () => screen.getByTestId('h1');

export const expectH1Text = (text: string) => {
  expect(getH1()).toHaveTextContent(text);
};
