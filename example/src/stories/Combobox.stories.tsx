import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';

import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  Button,
  NeobrutalismThemeProvider,
} from 'react-native-neobrutalism';

const meta: Meta<typeof Combobox> = {
  title: 'Forms/Combobox',
  component: Combobox,
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider>
        <View style={{ padding: 20, gap: 16, minHeight: 400 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
];

// Default
export const Default: Story = {
  render: () => (
    <View style={{ maxWidth: 300 }}>
      <Combobox placeholder="Select a framework">
        <ComboboxTrigger />
        <ComboboxContent>
          <ComboboxInput />
          <ComboboxList>
            {frameworks.map((fw) => (
              <ComboboxItem key={fw.value} value={fw.value} label={fw.label} />
            ))}
          </ComboboxList>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </View>
  ),
};

// With Search
export const WithSearch: Story = {
  render: () => (
    <View style={{ maxWidth: 300 }}>
      <Combobox placeholder="Search frameworks..." searchable>
        <ComboboxTrigger />
        <ComboboxContent>
          <ComboboxInput placeholder="Type to search..." />
          <ComboboxList>
            {frameworks.map((fw) => (
              <ComboboxItem key={fw.value} value={fw.value} label={fw.label} />
            ))}
          </ComboboxList>
          <ComboboxEmpty>No matches found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </View>
  ),
};

// Multi Select
export const MultiSelect: Story = {
  render: function MultiSelectExample() {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <View style={{ maxWidth: 300, gap: 16 }}>
        <Combobox
          mode="multiple"
          placeholder="Select frameworks"
          value={selected}
          onValueChange={(val) => setSelected(val as string[])}
        >
          <ComboboxTrigger />
          <ComboboxContent>
            <ComboboxInput />
            <ComboboxList>
              {frameworks.map((fw) => (
                <ComboboxItem
                  key={fw.value}
                  value={fw.value}
                  label={fw.label}
                />
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        {selected.length > 0 && (
          <Text style={styles.selectedText}>
            Selected: {selected.join(', ')}
          </Text>
        )}
      </View>
    );
  },
};

// With Groups
export const WithGroups: Story = {
  render: () => (
    <View style={{ maxWidth: 300 }}>
      <Combobox placeholder="Select a timezone">
        <ComboboxTrigger />
        <ComboboxContent maxHeight={350}>
          <ComboboxInput />
          <ComboboxList>
            <ComboboxGroup label="North America">
              <ComboboxItem
                value="est"
                label="Eastern Standard Time (EST)"
              />
              <ComboboxItem
                value="cst"
                label="Central Standard Time (CST)"
              />
              <ComboboxItem
                value="pst"
                label="Pacific Standard Time (PST)"
              />
            </ComboboxGroup>
            <ComboboxGroup label="Europe">
              <ComboboxItem value="gmt" label="Greenwich Mean Time (GMT)" />
              <ComboboxItem
                value="cet"
                label="Central European Time (CET)"
              />
            </ComboboxGroup>
            <ComboboxGroup label="Asia">
              <ComboboxItem value="ist" label="India Standard Time (IST)" />
              <ComboboxItem value="jst" label="Japan Standard Time (JST)" />
            </ComboboxGroup>
          </ComboboxList>
          <ComboboxEmpty>No timezone found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </View>
  ),
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <View style={{ maxWidth: 300, gap: 16 }}>
      <Combobox placeholder="Disabled combobox" disabled>
        <ComboboxTrigger />
        <ComboboxContent>
          <ComboboxList>
            {frameworks.map((fw) => (
              <ComboboxItem key={fw.value} value={fw.value} label={fw.label} />
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <Combobox placeholder="Has disabled items">
        <ComboboxTrigger />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxItem value="react" label="React" />
            <ComboboxItem value="vue" label="Vue" disabled />
            <ComboboxItem value="angular" label="Angular" />
            <ComboboxItem value="svelte" label="Svelte" disabled />
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </View>
  ),
};

// Controlled State
export const ControlledState: Story = {
  render: function ControlledExample() {
    const [value, setValue] = useState('react');
    const [open, setOpen] = useState(false);

    return (
      <View style={{ maxWidth: 300, gap: 16 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button
            label="React"
            onPress={() => setValue('react')}
            variant={value === 'react' ? 'primary' : 'outlined'}
            size="small"
          />
          <Button
            label="Vue"
            onPress={() => setValue('vue')}
            variant={value === 'vue' ? 'primary' : 'outlined'}
            size="small"
          />
        </View>

        <Combobox
          value={value}
          onValueChange={(val) => setValue(val as string)}
          open={open}
          onOpenChange={setOpen}
        >
          <ComboboxTrigger />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.map((fw) => (
                <ComboboxItem
                  key={fw.value}
                  value={fw.value}
                  label={fw.label}
                />
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Text style={styles.selectedText}>Selected: {value}</Text>
      </View>
    );
  },
};

// Country Selector
export const CountrySelector: Story = {
  render: () => (
    <View style={{ maxWidth: 300 }}>
      <Combobox placeholder="Select a country">
        <ComboboxTrigger />
        <ComboboxContent>
          <ComboboxInput placeholder="Search countries..." />
          <ComboboxList>
            <ComboboxItem value="us" label="United States" />
            <ComboboxItem value="uk" label="United Kingdom" />
            <ComboboxItem value="ca" label="Canada" />
            <ComboboxItem value="au" label="Australia" />
            <ComboboxItem value="de" label="Germany" />
            <ComboboxItem value="fr" label="France" />
            <ComboboxItem value="jp" label="Japan" />
            <ComboboxItem value="in" label="India" />
            <ComboboxItem value="br" label="Brazil" />
          </ComboboxList>
          <ComboboxEmpty>No country found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </View>
  ),
};

// Form Example
export const FormExample: Story = {
  render: function FormExample() {
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');

    return (
      <View style={formStyles.container}>
        <Text style={formStyles.title}>User Settings</Text>

        <View style={formStyles.field}>
          <Text style={formStyles.label}>Role</Text>
          <Combobox
            placeholder="Select role"
            value={role}
            onValueChange={(val) => setRole(val as string)}
          >
            <ComboboxTrigger />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxItem value="admin" label="Administrator" />
                <ComboboxItem value="editor" label="Editor" />
                <ComboboxItem value="viewer" label="Viewer" />
                <ComboboxItem value="guest" label="Guest" />
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </View>

        <View style={formStyles.field}>
          <Text style={formStyles.label}>Department</Text>
          <Combobox
            placeholder="Select department"
            value={department}
            onValueChange={(val) => setDepartment(val as string)}
          >
            <ComboboxTrigger />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxItem value="engineering" label="Engineering" />
                <ComboboxItem value="design" label="Design" />
                <ComboboxItem value="marketing" label="Marketing" />
                <ComboboxItem value="sales" label="Sales" />
                <ComboboxItem value="support" label="Support" />
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </View>

        <Button label="Save" fullWidth />
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
          colors: { primary: '#10B981', primaryForeground: '#FFFFFF' },
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
    <View style={{ maxWidth: 300 }}>
      <Combobox placeholder="Green themed">
        <ComboboxTrigger />
        <ComboboxContent>
          <ComboboxInput />
          <ComboboxList>
            {frameworks.map((fw) => (
              <ComboboxItem key={fw.value} value={fw.value} label={fw.label} />
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </View>
  ),
};

// No Shadow (trigger only - content has no shadow by default)
export const NoShadow: Story = {
  render: () => (
    <View style={{ maxWidth: 300 }}>
      <Combobox placeholder="No shadow on trigger">
        <ComboboxTrigger shadowStyle={null} />
        <ComboboxContent>
          <ComboboxList>
            {frameworks.map((fw) => (
              <ComboboxItem key={fw.value} value={fw.value} label={fw.label} />
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </View>
  ),
};

const styles = StyleSheet.create({
  selectedText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

const formStyles = StyleSheet.create({
  container: {
    gap: 16,
    maxWidth: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  field: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});
