import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { Progress, NeobrutalismThemeProvider } from 'react-native-neobrutalism';

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider>
        <View style={{ padding: 20, gap: 16 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  args: {
    value: 60,
    variant: 'primary',
    direction: 'left-to-right',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0–100). Use the slider to test.',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'warning', 'danger', 'success'],
      description: 'Visual variant',
    },
    direction: {
      control: 'radio',
      options: ['left-to-right', 'right-to-left'],
      description: 'Fill direction',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Show indeterminate animation',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Progress value={60} variant="primary" />
      <Progress value={60} variant="secondary" />
      <Progress value={60} variant="warning" />
      <Progress value={60} variant="danger" />
      <Progress value={60} variant="success" />
    </View>
  ),
};

export const LeftToRight: Story = {
  args: {
    value: 60,
    direction: 'left-to-right',
  },
};

export const RightToLeft: Story = {
  args: {
    value: 60,
    direction: 'right-to-left',
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider
        theme={{
          colors: { primary: '#FF6B6B', primaryForeground: '#FFFFFF' },
          border: { radius: 12 },
        }}
      >
        <View style={{ padding: 20 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  args: {
    value: 60,
  },
};
