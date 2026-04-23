import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'UiKit/Logo',
  component: Logo,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
