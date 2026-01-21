import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';

import {
  DatePicker,
  NeobrutalismThemeProvider,
} from 'react-native-neobrutalism';

const meta: Meta<typeof DatePicker> = {
  title: 'Form/DatePicker',
  component: DatePicker,
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider>
        <View style={{ padding: 20, minHeight: 500 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

// Default
export const Default: Story = {
  render: function Controlled() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <View style={{ gap: 16 }}>
        <DatePicker
          value={date}
          onValueChange={setDate}
          placeholder="Pick a date"
        />
        <Text style={{ fontWeight: '600' }}>
          Selected: {date ? date.toLocaleDateString() : 'None'}
        </Text>
      </View>
    );
  },
};

// With Default Value
export const WithDefaultValue: Story = {
  render: function WithDefault() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <View style={{ gap: 16 }}>
        <DatePicker
          value={date}
          onValueChange={setDate}
          placeholder="Pick a date"
        />
        <Text style={{ fontWeight: '600' }}>
          Selected: {date ? date.toLocaleDateString() : 'None'}
        </Text>
      </View>
    );
  },
};

// Custom Format
export const CustomFormat: Story = {
  render: function CustomFormatPicker() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const formatDate = (d: Date) => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      };
      return d.toLocaleDateString('en-US', options);
    };

    return (
      <View style={{ gap: 16 }}>
        <DatePicker
          value={date}
          onValueChange={setDate}
          formatDate={formatDate}
          placeholder="Select date"
        />
        <Text style={{ color: '#666' }}>
          Custom format: "Wed, Jan 15, 2025"
        </Text>
      </View>
    );
  },
};

// With Date Constraints
export const WithConstraints: Story = {
  render: function ConstrainedPicker() {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    const [date, setDate] = useState<Date | undefined>();

    return (
      <View style={{ gap: 16 }}>
        <Text style={{ fontWeight: '600' }}>
          Select a date within 2 months from now
        </Text>
        <DatePicker
          value={date}
          onValueChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
          placeholder="Select date"
        />
        <Text style={{ color: '#666' }}>
          Min: {minDate.toLocaleDateString()} | Max: {maxDate.toLocaleDateString()}
        </Text>
      </View>
    );
  },
};

// With Disabled Dates
export const WithDisabledDates: Story = {
  render: function DisabledDatesPicker() {
    const today = new Date();
    const disabledDates = [
      new Date(today.getFullYear(), today.getMonth(), 10),
      new Date(today.getFullYear(), today.getMonth(), 15),
      new Date(today.getFullYear(), today.getMonth(), 20),
      new Date(today.getFullYear(), today.getMonth(), 25),
    ];
    const [date, setDate] = useState<Date | undefined>();

    return (
      <View style={{ gap: 16 }}>
        <Text style={{ fontWeight: '600' }}>
          10th, 15th, 20th, and 25th are disabled
        </Text>
        <DatePicker
          value={date}
          onValueChange={setDate}
          disabledDates={disabledDates}
          placeholder="Select available date"
        />
      </View>
    );
  },
};

// Disabled State
export const Disabled: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <DatePicker
        defaultValue={new Date()}
        disabled
        placeholder="Cannot select"
      />
      <Text style={{ color: '#666' }}>The date picker is disabled</Text>
    </View>
  ),
};

// Form Example
export const FormExample: Story = {
  render: function FormDatePicker() {
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();

    return (
      <View style={{ gap: 24, maxWidth: 320 }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Book a Stay</Text>

        <View style={{ gap: 8 }}>
          <Text style={{ fontWeight: '600' }}>Check-in Date</Text>
          <DatePicker
            value={startDate}
            onValueChange={setStartDate}
            placeholder="Select check-in"
            minDate={new Date()}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontWeight: '600' }}>Check-out Date</Text>
          <DatePicker
            value={endDate}
            onValueChange={setEndDate}
            placeholder="Select check-out"
            minDate={startDate || new Date()}
          />
        </View>

        {startDate && endDate && (
          <View
            style={{
              backgroundColor: '#f5f5f5',
              padding: 16,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: '#000',
            }}
          >
            <Text style={{ fontWeight: '600' }}>Booking Summary</Text>
            <Text>From: {startDate.toLocaleDateString()}</Text>
            <Text>To: {endDate.toLocaleDateString()}</Text>
            <Text>
              Duration:{' '}
              {Math.ceil(
                (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
              )}{' '}
              nights
            </Text>
          </View>
        )}
      </View>
    );
  },
};

// Custom Theme
export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider
        theme={{
          shadow: { offsetX: 6, offsetY: 6, color: '#333333' },
          colors: {
            primary: '#8B5CF6',
            primaryForeground: '#FFFFFF',
            background: '#F5F3FF',
          },
          border: { radius: 12 },
        }}
      >
        <View style={{ padding: 20, minHeight: 500 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  render: function CustomThemePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <DatePicker
        value={date}
        onValueChange={setDate}
        placeholder="Pick a date"
      />
    );
  },
};
