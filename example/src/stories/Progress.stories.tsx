import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import {
  Button,
  Progress,
  NeobrutalismThemeProvider,
} from 'react-native-neobrutalism';

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
    max: 100,
    variant: 'primary',
    direction: 'left-to-right',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress (0 to max)',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum value representing 100%',
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
    duration: {
      control: { type: 'number', min: 50, max: 2000, step: 50 },
      description: 'Animation duration in milliseconds',
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

export const Interactive: Story = {
  render: function InteractiveProgress(args) {
    const maxVal = args.max ?? 100;
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
      if (!isRunning) return;
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= maxVal) {
            setIsRunning(false);
            return maxVal;
          }
          return Math.min(p + 5, maxVal);
        });
      }, 100);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [isRunning, maxVal]);

    const stop = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    };

    return (
      <View style={{ gap: 12 }}>
        <Progress {...args} value={progress} max={maxVal} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Button
            label="Start"
            onPress={() => setIsRunning(true)}
            disabled={isRunning}
          />
          <Button label="Stop" onPress={stop} disabled={!isRunning} />
          {[0, 25, 50, 75, 100].map((n) => (
            <Button
              key={n}
              label={`${n}%`}
              onPress={() => {
                stop();
                setProgress(Math.round((maxVal * n) / 100));
              }}
            />
          ))}
        </View>
      </View>
    );
  },
  args: { max: 100 },
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
