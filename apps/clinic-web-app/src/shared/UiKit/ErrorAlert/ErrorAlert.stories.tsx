import type { Meta, StoryObj } from '@storybook/react-vite';

import ErrorAlert from './ErrorAlert';

const meta: Meta<typeof ErrorAlert> = {
  title: 'UiKit/ErrorAlert',
  component: ErrorAlert,
};

export default meta;

type Story = StoryObj<typeof ErrorAlert>;

export const Default: Story = {
  args: { error: new Error('Something went wrong') },
};

export const CustomTitle: Story = {
  args: {
    error: new Error('Connection refused'),
    title: 'Failed to load clients',
  },
};

export const StringError: Story = {
  args: { error: 'Plain string error', title: 'Validation failed' },
};

export const Hidden: Story = {
  args: { error: null },
};
