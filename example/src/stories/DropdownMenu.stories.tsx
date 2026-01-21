import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Button,
  NeobrutalismThemeProvider,
} from 'react-native-neobrutalism';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Overlay/DropdownMenu',
  component: DropdownMenu,
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

type Story = StoryObj<typeof DropdownMenu>;

// Default
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button label="Open Menu" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem label="Profile" onPress={() => {}} />
        <DropdownMenuItem label="Settings" onPress={() => {}} />
        <DropdownMenuItem label="Billing" onPress={() => {}} />
        <DropdownMenuSeparator />
        <DropdownMenuItem label="Logout" onPress={() => {}} />
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button label="Actions" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          label="Edit"
          icon={<Text>✏️</Text>}
          shortcut="⌘E"
          onPress={() => {}}
        />
        <DropdownMenuItem
          label="Duplicate"
          icon={<Text>📋</Text>}
          shortcut="⌘D"
          onPress={() => {}}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          label="Archive"
          icon={<Text>📦</Text>}
          onPress={() => {}}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          label="Delete"
          icon={<Text>🗑️</Text>}
          destructive
          onPress={() => {}}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// With Checkboxes
export const WithCheckboxes: Story = {
  render: function CheckboxExample() {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    return (
      <View style={{ gap: 16 }}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary" label="View Options" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              label="Status Bar"
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            />
            <DropdownMenuCheckboxItem
              label="Activity Bar"
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            />
            <DropdownMenuCheckboxItem
              label="Panel"
              checked={showPanel}
              onCheckedChange={setShowPanel}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <View style={{ gap: 4 }}>
          <Text>Status Bar: {showStatusBar ? 'Visible' : 'Hidden'}</Text>
          <Text>Activity Bar: {showActivityBar ? 'Visible' : 'Hidden'}</Text>
          <Text>Panel: {showPanel ? 'Visible' : 'Hidden'}</Text>
        </View>
      </View>
    );
  },
};

// Alignment Options
export const Alignments: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, paddingTop: 50 }}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="secondary" label="Align Start" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem label="Option 1" onPress={() => {}} />
          <DropdownMenuItem label="Option 2" onPress={() => {}} />
          <DropdownMenuItem label="Option 3" onPress={() => {}} />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="secondary" label="Align Center" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem label="Option 1" onPress={() => {}} />
          <DropdownMenuItem label="Option 2" onPress={() => {}} />
          <DropdownMenuItem label="Option 3" onPress={() => {}} />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="secondary" label="Align End" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem label="Option 1" onPress={() => {}} />
          <DropdownMenuItem label="Option 2" onPress={() => {}} />
          <DropdownMenuItem label="Option 3" onPress={() => {}} />
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  ),
};

// Disabled Items
export const DisabledItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button label="Options" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem label="New File" onPress={() => {}} />
        <DropdownMenuItem label="Open File" onPress={() => {}} />
        <DropdownMenuItem label="Save" disabled onPress={() => {}} />
        <DropdownMenuSeparator />
        <DropdownMenuItem label="Export" disabled onPress={() => {}} />
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// Controlled State
export const ControlledState: Story = {
  render: function Controlled() {
    const [open, setOpen] = useState(false);

    return (
      <View style={{ gap: 16 }}>
        <Text style={{ fontWeight: '600' }}>
          Menu is {open ? 'open' : 'closed'}
        </Text>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger>
            <Button label="Toggle Menu" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem label="Action 1" onPress={() => {}} />
            <DropdownMenuItem label="Action 2" onPress={() => {}} />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              label="Close"
              onPress={() => setOpen(false)}
            />
          </DropdownMenuContent>
        </DropdownMenu>
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
            primary: '#F97316',
            primaryForeground: '#FFFFFF',
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button label="Custom Styled" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem label="Edit" onPress={() => {}} />
        <DropdownMenuItem label="Share" onPress={() => {}} />
        <DropdownMenuItem label="Delete" destructive onPress={() => {}} />
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
