import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  NeobrutalismThemeProvider,
} from 'react-native-neobrutalism';

const meta: Meta<typeof ContextMenu> = {
  title: 'Overlays/ContextMenu',
  component: ContextMenu,
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

type Story = StoryObj<typeof ContextMenu>;

// Default
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <View style={styles.triggerBox}>
          <Text style={styles.triggerText}>Right-click me</Text>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem label="Copy" onPress={() => console.log('Copy')} />
        <ContextMenuItem label="Paste" onPress={() => console.log('Paste')} />
        <ContextMenuItem label="Cut" onPress={() => console.log('Cut')} />
      </ContextMenuContent>
    </ContextMenu>
  ),
};

// With Icons and Shortcuts
export const WithShortcuts: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <View style={styles.triggerBox}>
          <Text style={styles.triggerText}>Right-click for actions</Text>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          label="Undo"
          shortcut="⌘Z"
          onPress={() => console.log('Undo')}
        />
        <ContextMenuItem
          label="Redo"
          shortcut="⇧⌘Z"
          onPress={() => console.log('Redo')}
        />
        <ContextMenuSeparator />
        <ContextMenuItem
          label="Cut"
          shortcut="⌘X"
          onPress={() => console.log('Cut')}
        />
        <ContextMenuItem
          label="Copy"
          shortcut="⌘C"
          onPress={() => console.log('Copy')}
        />
        <ContextMenuItem
          label="Paste"
          shortcut="⌘V"
          onPress={() => console.log('Paste')}
        />
      </ContextMenuContent>
    </ContextMenu>
  ),
};

// With Labels and Groups
export const WithLabels: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <View style={styles.triggerBox}>
          <Text style={styles.triggerText}>Right-click for menu</Text>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Edit</ContextMenuLabel>
        <ContextMenuItem label="Cut" onPress={() => {}} />
        <ContextMenuItem label="Copy" onPress={() => {}} />
        <ContextMenuItem label="Paste" onPress={() => {}} />
        <ContextMenuSeparator />
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuItem label="Zoom In" onPress={() => {}} />
        <ContextMenuItem label="Zoom Out" onPress={() => {}} />
        <ContextMenuItem label="Reset Zoom" onPress={() => {}} />
      </ContextMenuContent>
    </ContextMenu>
  ),
};

// With Checkbox Items
export const WithCheckbox: Story = {
  render: function CheckboxExample() {
    const [showGrid, setShowGrid] = useState(true);
    const [showRulers, setShowRulers] = useState(false);
    const [snapToGrid, setSnapToGrid] = useState(true);

    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <View style={styles.triggerBox}>
            <Text style={styles.triggerText}>Right-click for options</Text>
            <Text style={styles.statusText}>
              Grid: {showGrid ? 'On' : 'Off'} | Rulers:{' '}
              {showRulers ? 'On' : 'Off'}
            </Text>
          </View>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>View Options</ContextMenuLabel>
          <ContextMenuCheckboxItem
            label="Show Grid"
            checked={showGrid}
            onCheckedChange={setShowGrid}
          />
          <ContextMenuCheckboxItem
            label="Show Rulers"
            checked={showRulers}
            onCheckedChange={setShowRulers}
          />
          <ContextMenuCheckboxItem
            label="Snap to Grid"
            checked={snapToGrid}
            onCheckedChange={setSnapToGrid}
          />
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

// Destructive Actions
export const DestructiveActions: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <View style={styles.triggerBox}>
          <Text style={styles.triggerText}>Right-click for file options</Text>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem label="Open" onPress={() => {}} />
        <ContextMenuItem label="Share" onPress={() => {}} />
        <ContextMenuItem label="Duplicate" onPress={() => {}} />
        <ContextMenuSeparator />
        <ContextMenuItem label="Move to Trash" destructive onPress={() => {}} />
      </ContextMenuContent>
    </ContextMenu>
  ),
};

// Disabled Items
export const DisabledItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <View style={styles.triggerBox}>
          <Text style={styles.triggerText}>Right-click me</Text>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem label="Cut" onPress={() => {}} disabled />
        <ContextMenuItem label="Copy" onPress={() => {}} />
        <ContextMenuItem label="Paste" onPress={() => {}} disabled />
        <ContextMenuSeparator />
        <ContextMenuItem label="Delete" destructive onPress={() => {}} />
      </ContextMenuContent>
    </ContextMenu>
  ),
};

// On Card
export const OnCard: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card style={{ maxWidth: 300 }} shadowStyle={null}>
          <CardHeader>
            <CardTitle>Project Alpha</CardTitle>
            <CardDescription>Right-click for actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>This card has a context menu. Right-click to see options.</Text>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem label="Edit" onPress={() => {}} />
        <ContextMenuItem label="Duplicate" onPress={() => {}} />
        <ContextMenuItem label="Archive" onPress={() => {}} />
        <ContextMenuSeparator />
        <ContextMenuItem label="Delete" destructive onPress={() => {}} />
      </ContextMenuContent>
    </ContextMenu>
  ),
};

// Custom Theme
export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider
        theme={{
          colors: { primary: '#8B5CF6', primaryForeground: '#FFFFFF' },
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
    <ContextMenu>
      <ContextMenuTrigger>
        <View style={[styles.triggerBox, { backgroundColor: '#F3E8FF' }]}>
          <Text style={styles.triggerText}>Purple themed menu</Text>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem label="Option 1" onPress={() => {}} />
        <ContextMenuItem label="Option 2" onPress={() => {}} />
        <ContextMenuItem label="Option 3" onPress={() => {}} />
      </ContextMenuContent>
    </ContextMenu>
  ),
};

const styles = StyleSheet.create({
  triggerBox: {
    padding: 40,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  triggerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  statusText: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
  },
});
