import { screen } from '@testing-library/react';
import { expect } from 'vitest';

export const getSection = () => screen.getByTestId('section');

export const expectSectionVisible = () => {
  expect(getSection()).toBeInTheDocument();
};
