import type { Meta, StoryObj } from '@storybook/react-vite';

import H1 from './H1';

const meta: Meta<typeof H1> = {
  title: 'UiKit/H1',
  component: H1,
};

export default meta;

type Story = StoryObj<typeof H1>;

export const Default: Story = {
  args: { children: 'Page title' },
};
