import type { Meta, StoryObj } from '@storybook/react-vite';

import H1 from '../H1/H1';
import PageContent from './PageContent';

const meta: Meta<typeof PageContent> = {
  title: 'UiKit/PageContent',
  component: PageContent,
};

export default meta;

type Story = StoryObj<typeof PageContent>;

export const WithTitle: Story = {
  render: () => (
    <PageContent>
      <H1>Dashboard</H1>
      <p>Page body content goes here.</p>
    </PageContent>
  ),
};
