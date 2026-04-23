import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import Logo from '../Logo/Logo';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'UiKit/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const WithLogo: Story = {
  render: () => (
    <Header>
      <Logo />
    </Header>
  ),
};
