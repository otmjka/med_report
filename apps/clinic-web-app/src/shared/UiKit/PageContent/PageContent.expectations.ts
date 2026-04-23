import { screen } from '@testing-library/react';
import { expect } from 'vitest';

export const getPageContent = () => screen.getByTestId('page-content');

export const expectPageContentVisible = () => {
  expect(getPageContent()).toBeInTheDocument();
};
