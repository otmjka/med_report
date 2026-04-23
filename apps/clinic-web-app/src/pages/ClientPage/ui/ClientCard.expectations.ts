import { screen } from '@testing-library/react';
import { expect } from 'vitest';

export const queryClientCard = () => screen.queryByTestId('client-card');
export const getClientCard = () => screen.getByTestId('client-card');

export const expectClientCardVisible = () => {
  expect(getClientCard()).toBeInTheDocument();
};

export const expectClientCardAbsent = () => {
  expect(queryClientCard()).not.toBeInTheDocument();
};

export const expectClientCardShows = (id: number, name: string) => {
  const card = getClientCard();
  expect(card).toHaveTextContent(`#${id}`);
  expect(card).toHaveTextContent(name);
};
