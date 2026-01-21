import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  NeobrutalismThemeProvider,
} from 'react-native-neobrutalism';

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider>
        <View style={{ padding: 20, minHeight: 400 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Popover>;

// Default
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button label="Open Popover" />
      </PopoverTrigger>
      <PopoverContent>
        <View style={{ gap: 8 }}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>Popover Title</Text>
          <Text>This is the popover content. You can put any content here.</Text>
        </View>
      </PopoverContent>
    </Popover>
  ),
};

// Controlled State
export const ControlledState: Story = {
  render: function Controlled() {
    const [open, setOpen] = useState(false);

    return (
      <View style={{ gap: 16 }}>
        <Text style={{ fontWeight: '600' }}>
          Popover is {open ? 'open' : 'closed'}
        </Text>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <Button label="Toggle Popover" />
          </PopoverTrigger>
          <PopoverContent>
            <View style={{ gap: 12 }}>
              <Text style={{ fontWeight: '600' }}>Controlled Popover</Text>
              <Text>The popover state is controlled externally.</Text>
              <Button variant="secondary" label="Close" onPress={() => setOpen(false)} />
            </View>
          </PopoverContent>
        </Popover>
      </View>
    );
  },
};

// Alignment Options
export const Alignments: Story = {
  render: () => (
    <View style={{ gap: 16, alignItems: 'center', paddingTop: 100 }}>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Popover>
          <PopoverTrigger>
            <Button variant="secondary" label="Align Start" />
          </PopoverTrigger>
          <PopoverContent align="start">
            <Text>Aligned to start</Text>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Button variant="secondary" label="Align Center" />
          </PopoverTrigger>
          <PopoverContent align="center">
            <Text>Aligned to center</Text>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Button variant="secondary" label="Align End" />
          </PopoverTrigger>
          <PopoverContent align="end">
            <Text>Aligned to end</Text>
          </PopoverContent>
        </Popover>
      </View>
    </View>
  ),
};

// Form Example
export const FormExample: Story = {
  render: function FormPopover() {
    const [name] = useState('');
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button label="Update Name" />
        </PopoverTrigger>
        <PopoverContent style={{ minWidth: 280 }}>
          <View style={{ gap: 16 }}>
            <View>
              <Text style={{ fontWeight: '600', fontSize: 16 }}>Edit Name</Text>
              <Text style={{ color: '#666', marginTop: 4 }}>
                Enter your display name.
              </Text>
            </View>
            <View
              style={{
                borderWidth: 2,
                borderColor: '#000',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: name ? '#000' : '#999',
                }}
              >
                {name || 'Enter name...'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
              <Button
                variant="secondary"
                size="small"
                label="Cancel"
                onPress={() => setOpen(false)}
              />
              <Button size="small" label="Save" onPress={() => setOpen(false)} />
            </View>
          </View>
        </PopoverContent>
      </Popover>
    );
  },
};

// Information Popover
export const InfoPopover: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text style={{ fontWeight: '600' }}>Account Status</Text>
      <Popover>
        <PopoverTrigger>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>?</Text>
          </View>
        </PopoverTrigger>
        <PopoverContent style={{ maxWidth: 280 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: '600' }}>What is Account Status?</Text>
            <Text style={{ lineHeight: 20 }}>
              Your account status indicates whether your account is active,
              pending verification, or has any restrictions.
            </Text>
          </View>
        </PopoverContent>
      </Popover>
    </View>
  ),
};

// Custom Theme
export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider
        theme={{
          shadow: { offsetX: 6, offsetY: 6, color: '#333333' },
          colors: {
            primary: '#FF6B6B',
            primaryForeground: '#FFFFFF',
            background: '#FFF5F5',
          },
          border: { radius: 12 },
        }}
      >
        <View style={{ padding: 20, minHeight: 400 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button label="Custom Styled Popover" />
      </PopoverTrigger>
      <PopoverContent>
        <View style={{ gap: 8 }}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>Custom Theme</Text>
          <Text>This popover uses custom theme settings.</Text>
        </View>
      </PopoverContent>
    </Popover>
  ),
};
