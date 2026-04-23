import { screen } from '@testing-library/react';
import { expect } from 'vitest';

export const getHeader = () => screen.getByTestId('header');

export const expectHeaderVisible = () => {
  expect(getHeader()).toBeInTheDocument();
};
