import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
  NeobrutalismThemeProvider,
} from 'react-native-neobrutalism';

const meta: Meta<typeof Collapsible> = {
  title: 'Data Display/Collapsible',
  component: Collapsible,
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider>
        <View style={{ padding: 20, gap: 16, maxWidth: 400 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

// Default
export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
      <CollapsibleContent>
        <Text>
          This is the collapsible content. It will animate in and out when you
          click the trigger.
        </Text>
      </CollapsibleContent>
    </Collapsible>
  ),
};

// Default Open
export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Already expanded</CollapsibleTrigger>
      <CollapsibleContent>
        <Text>
          This content is visible by default because defaultOpen is true.
        </Text>
      </CollapsibleContent>
    </Collapsible>
  ),
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <Collapsible disabled>
      <CollapsibleTrigger>Cannot expand (disabled)</CollapsibleTrigger>
      <CollapsibleContent>
        <Text>You will never see this content.</Text>
      </CollapsibleContent>
    </Collapsible>
  ),
};

// Without Chevron
export const WithoutChevron: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger showChevron={false}>
        Simple trigger without chevron
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text>Content without the chevron indicator.</Text>
      </CollapsibleContent>
    </Collapsible>
  ),
};

// Custom Trigger
export const CustomTrigger: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button label="Toggle Content" variant="primary" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text style={{ marginTop: 12 }}>
          Using a Button component as the trigger via asChild prop.
        </Text>
      </CollapsibleContent>
    </Collapsible>
  ),
};

// Controlled State
export const ControlledState: Story = {
  render: function ControlledExample() {
    const [open, setOpen] = useState(false);

    return (
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button
            label="Open"
            onPress={() => setOpen(true)}
            variant={open ? 'primary' : 'outlined'}
            size="small"
          />
          <Button
            label="Close"
            onPress={() => setOpen(false)}
            variant={!open ? 'primary' : 'outlined'}
            size="small"
          />
        </View>

        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger>Controlled collapsible</CollapsibleTrigger>
          <CollapsibleContent>
            <Text>This is controlled externally via open prop.</Text>
          </CollapsibleContent>
        </Collapsible>
      </View>
    );
  },
};

// Nested Collapsibles
export const NestedCollapsibles: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Parent Collapsible</CollapsibleTrigger>
      <CollapsibleContent>
        <View style={{ gap: 12 }}>
          <Text>Parent content here.</Text>

          <Collapsible>
            <CollapsibleTrigger>Nested Collapsible 1</CollapsibleTrigger>
            <CollapsibleContent>
              <Text>Nested content 1.</Text>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger>Nested Collapsible 2</CollapsibleTrigger>
            <CollapsibleContent>
              <Text>Nested content 2.</Text>
            </CollapsibleContent>
          </Collapsible>
        </View>
      </CollapsibleContent>
    </Collapsible>
  ),
};

// FAQ Example
export const FAQExample: Story = {
  render: () => (
    <View style={faqStyles.container}>
      <Text style={faqStyles.title}>Frequently Asked Questions</Text>

      <View style={faqStyles.list}>
        <Collapsible>
          <CollapsibleTrigger>What is neobrutalism?</CollapsibleTrigger>
          <CollapsibleContent>
            <Text style={faqStyles.answer}>
              Neobrutalism is a design style characterized by bold colors,
              strong contrasts, and intentionally raw aesthetics. It features
              thick black borders, offset shadows, and a playful approach to
              digital design.
            </Text>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger>How do I customize the theme?</CollapsibleTrigger>
          <CollapsibleContent>
            <Text style={faqStyles.answer}>
              Wrap your app with NeobrutalismThemeProvider and pass a custom
              theme object. You can customize colors, borders, shadows, and
              spacing to match your brand.
            </Text>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger>Is it accessible?</CollapsibleTrigger>
          <CollapsibleContent>
            <Text style={faqStyles.answer}>
              Yes! All components include proper accessibility roles, states,
              and labels. The Collapsible uses accessibilityRole="button" with
              expanded state announcements.
            </Text>
          </CollapsibleContent>
        </Collapsible>
      </View>
    </View>
  ),
};

// With Rich Content
export const WithRichContent: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>View Details</CollapsibleTrigger>
      <CollapsibleContent>
        <View style={richStyles.content}>
          <View style={richStyles.row}>
            <Text style={richStyles.label}>Order ID:</Text>
            <Text style={richStyles.value}>#12345</Text>
          </View>
          <View style={richStyles.row}>
            <Text style={richStyles.label}>Status:</Text>
            <Text style={[richStyles.value, { color: '#22C55E' }]}>
              Delivered
            </Text>
          </View>
          <View style={richStyles.row}>
            <Text style={richStyles.label}>Total:</Text>
            <Text style={richStyles.value}>$99.99</Text>
          </View>
          <Button label="Track Order" size="small" fullWidth />
        </View>
      </CollapsibleContent>
    </Collapsible>
  ),
};

// Custom Theme
export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider
        theme={{
          colors: { primary: '#F59E0B', background: '#FEF3C7' },
          border: { radius: 12 },
        }}
      >
        <View style={{ padding: 20, maxWidth: 400 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Amber themed collapsible</CollapsibleTrigger>
      <CollapsibleContent>
        <Text>Custom themed content with amber colors.</Text>
      </CollapsibleContent>
    </Collapsible>
  ),
};

const faqStyles = StyleSheet.create({
  container: {
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  list: {
    gap: 8,
  },
  answer: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
  },
});

const richStyles = StyleSheet.create({
  content: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '500',
    color: '#6B7280',
  },
  value: {
    fontWeight: '600',
  },
});
