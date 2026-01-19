import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';

import { Checkbox, Button, NeobrutalismThemeProvider } from 'react-native-neobrutalism';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
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
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

// Default
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

// Checked
export const Checked: Story = {
  args: {
    label: 'This is checked',
    defaultChecked: true,
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: 'Remember me',
  },
};

// Label on Left
export const LabelLeft: Story = {
  args: {
    label: 'Toggle this option',
    labelPosition: 'left',
  },
};

// Disabled States
export const Disabled: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </View>
  ),
};

// Indeterminate
export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Checkbox label="Small checkbox" size="small" />
      <Checkbox label="Default checkbox" size="default" />
      <Checkbox label="Large checkbox" size="large" />
    </View>
  ),
};

// Controlled State
export const ControlledState: Story = {
  render: function ControlledExample() {
    const [checked, setChecked] = useState(false);

    return (
      <View style={{ gap: 16 }}>
        <Checkbox
          label={`Checkbox is ${checked ? 'checked' : 'unchecked'}`}
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Button
          label={checked ? 'Uncheck' : 'Check'}
          onPress={() => setChecked(!checked)}
          size="small"
        />
      </View>
    );
  },
};

// Form Example
export const FormExample: Story = {
  render: function FormCheckboxes() {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);
    const [analytics, setAnalytics] = useState(true);

    return (
      <View style={formStyles.container}>
        <Text style={formStyles.title}>Email Preferences</Text>
        <View style={formStyles.options}>
          <Checkbox
            label="Product notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
          <Checkbox
            label="Marketing emails"
            checked={marketing}
            onCheckedChange={setMarketing}
          />
          <Checkbox
            label="Analytics & usage data"
            checked={analytics}
            onCheckedChange={setAnalytics}
          />
        </View>
        <Button label="Save preferences" fullWidth />
      </View>
    );
  },
};

// Terms and Conditions
export const TermsAndConditions: Story = {
  render: function TermsExample() {
    const [agreed, setAgreed] = useState(false);

    return (
      <View style={termsStyles.container}>
        <Checkbox
          label={
            <Text style={termsStyles.label}>
              I agree to the{' '}
              <Text style={termsStyles.link}>Terms of Service</Text> and{' '}
              <Text style={termsStyles.link}>Privacy Policy</Text>
            </Text>
          }
          checked={agreed}
          onCheckedChange={setAgreed}
        />
        <Button label="Continue" fullWidth disabled={!agreed} />
      </View>
    );
  },
};

// Select All Pattern
export const SelectAllPattern: Story = {
  render: function SelectAllExample() {
    const [items, setItems] = useState([
      { id: 1, label: 'Item 1', checked: false },
      { id: 2, label: 'Item 2', checked: true },
      { id: 3, label: 'Item 3', checked: false },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const indeterminate = someChecked && !allChecked;

    const handleSelectAll = () => {
      const newChecked = !allChecked;
      setItems(items.map((item) => ({ ...item, checked: newChecked })));
    };

    const handleItemChange = (id: number, checked: boolean) => {
      setItems(
        items.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <View style={{ gap: 8 }}>
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={indeterminate}
          onCheckedChange={handleSelectAll}
        />
        <View style={{ marginLeft: 24, gap: 8 }}>
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onCheckedChange={(checked) => handleItemChange(item.id, checked)}
            />
          ))}
        </View>
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
          colors: { primary: '#A855F7', primaryForeground: '#FFFFFF' },
          border: { radius: 8 },
        }}
      >
        <View style={{ padding: 20 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  args: {
    label: 'Purple themed checkbox',
    defaultChecked: true,
  },
};


const formStyles = StyleSheet.create({
  container: {
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  options: {
    gap: 12,
  },
});

const termsStyles = StyleSheet.create({
  container: {
    gap: 16,
    maxWidth: 320,
  },
  label: {
    fontSize: 14,
  },
  link: {
    color: '#88AAEE',
    textDecorationLine: 'underline',
  },
});
