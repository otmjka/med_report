import type { Meta, StoryObj } from '@storybook/react-vite';

import InlineError from './InlineError';

const meta: Meta<typeof InlineError> = {
  title: 'UiKit/InlineError',
  component: InlineError,
};

export default meta;

type Story = StoryObj<typeof InlineError>;

export const ErrorObject: Story = {
  args: { isError: true, error: new Error('500 Internal Server Error') },
};

export const StringError: Story = {
  args: { isError: true, error: 'Network timeout' },
};

export const Hidden: Story = {
  args: { isError: false, error: null },
};
