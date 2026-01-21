import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';

import {
  Alert,
  AlertTitle,
  AlertDescription,
  NeobrutalismThemeProvider,
} from 'react-native-neobrutalism';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider>
        <View style={{ padding: 20, gap: 16 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

// Default
export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This is an important notification for the user.
      </AlertDescription>
    </Alert>
  ),
};

// Destructive
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

// With Icon
export const WithIcon: Story = {
  render: () => (
    <Alert icon={<Text style={{ fontSize: 20 }}>ℹ️</Text>}>
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is an informational alert with an icon.
      </AlertDescription>
    </Alert>
  ),
};

// Destructive With Icon
export const DestructiveWithIcon: Story = {
  render: () => (
    <Alert variant="destructive" icon={<Text style={{ fontSize: 20 }}>🚨</Text>}>
      <AlertTitle>Critical Error</AlertTitle>
      <AlertDescription>
        A critical error occurred. Please contact support immediately.
      </AlertDescription>
    </Alert>
  ),
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Alert icon={<Text>📝</Text>}>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with light background.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive" icon={<Text>⚠️</Text>}>
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This is a destructive alert with danger styling.
        </AlertDescription>
      </Alert>
    </View>
  ),
};

// Title Only
export const TitleOnly: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Simple notification message</AlertTitle>
    </Alert>
  ),
};

// Description Only
export const DescriptionOnly: Story = {
  render: () => (
    <Alert>
      <AlertDescription>
        This alert only has a description without a title.
      </AlertDescription>
    </Alert>
  ),
};

// Custom Theme
export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider
        theme={{
          shadow: { offsetX: 6, offsetY: 6, color: '#333' },
          border: { radius: 12 },
        }}
      >
        <View style={{ padding: 20 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  render: () => (
    <Alert icon={<Text>✨</Text>}>
      <AlertTitle>Custom Styled Alert</AlertTitle>
      <AlertDescription>
        This alert uses custom theme settings for shadow and border radius.
      </AlertDescription>
    </Alert>
  ),
};

// No Shadow
export const NoShadow: Story = {
  render: () => (
    <Alert shadowStyle={null}>
      <AlertTitle>No Shadow Alert</AlertTitle>
      <AlertDescription>
        This alert has no shadow effect.
      </AlertDescription>
    </Alert>
  ),
};
