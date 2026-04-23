import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/shared/ui/button';

import H2 from '../H2/H2';
import Section from './Section';

const meta: Meta<typeof Section> = {
  title: 'UiKit/Section',
  component: Section,
};

export default meta;

type Story = StoryObj<typeof Section>;

export const TitleAndAction: Story = {
  render: () => (
    <Section>
      <H2>Clients</H2>
      <Button>Make report</Button>
    </Section>
  ),
};
