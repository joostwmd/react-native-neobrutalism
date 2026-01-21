import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
  Input,
  NeobrutalismThemeProvider,
} from 'react-native-neobrutalism';

const meta: Meta<typeof Dialog> = {
  title: 'Overlay/Dialog',
  component: Dialog,
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

type Story = StoryObj<typeof Dialog>;

// Default
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button label="Open Dialog" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <View style={{ gap: 16 }}>
          <View style={{ gap: 4 }}>
            <Text style={{ fontWeight: '600' }}>Name</Text>
            <Input placeholder="Enter your name" />
          </View>
          <View style={{ gap: 4 }}>
            <Text style={{ fontWeight: '600' }}>Username</Text>
            <Input placeholder="@username" />
          </View>
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button label="Cancel" variant="secondary" />
          </DialogClose>
          <Button label="Save changes" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Simple Dialog
export const Simple: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button label="Show Message" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome!</DialogTitle>
          <DialogDescription>
            Thank you for trying out our neobrutalism components.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button label="Got it" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// With Close Button
export const WithCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button label="Open with X" />
      </DialogTrigger>
      <DialogContent>
        <DialogClose />
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>
            Manage your notification preferences here.
          </DialogDescription>
        </DialogHeader>
        <View style={{ paddingVertical: 16 }}>
          <Text>Content goes here...</Text>
        </View>
      </DialogContent>
    </Dialog>
  ),
};

// Controlled Dialog
export const Controlled: Story = {
  render: function ControlledDialog() {
    const [open, setOpen] = useState(false);

    return (
      <View style={{ gap: 16 }}>
        <Button label="Open Controlled Dialog" onPress={() => setOpen(true)} />
        <Text>Dialog is {open ? 'open' : 'closed'}</Text>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's state is controlled externally.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button label="Close" onPress={() => setOpen(false)} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    );
  },
};

// No Backdrop Close
export const NoBackdropClose: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button label="Open (no backdrop close)" />
      </DialogTrigger>
      <DialogContent closeOnBackdropPress={false}>
        <DialogHeader>
          <DialogTitle>Important Action</DialogTitle>
          <DialogDescription>
            You must click a button to close this dialog. Clicking outside won't work.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button label="I understand" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Scrollable Content
export const ScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button label="Open Long Dialog" />
      </DialogTrigger>
      <DialogContent style={{ maxHeight: 400 }}>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our terms carefully.
          </DialogDescription>
        </DialogHeader>
        <View style={{ gap: 12 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Text key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          ))}
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button label="Decline" variant="secondary" />
          </DialogClose>
          <DialogClose asChild>
            <Button label="Accept" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Form Dialog
export const FormDialog: Story = {
  render: function FormDialogStory() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = () => {
      console.log('Form submitted:', formData);
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button label="Sign In" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your account.
            </DialogDescription>
          </DialogHeader>
          <View style={{ gap: 16 }}>
            <View style={{ gap: 4 }}>
              <Text style={{ fontWeight: '600' }}>Email</Text>
              <Input
                placeholder="email@example.com"
                value={formData.email}
                onChangeText={(email) => setFormData({ ...formData, email })}
              />
            </View>
            <View style={{ gap: 4 }}>
              <Text style={{ fontWeight: '600' }}>Password</Text>
              <Input
                placeholder="Enter password"
                secureTextEntry
                value={formData.password}
                onChangeText={(password) => setFormData({ ...formData, password })}
              />
            </View>
          </View>
          <DialogFooter>
            <DialogClose asChild>
              <Button label="Cancel" variant="secondary" />
            </DialogClose>
            <DialogClose asChild>
              <Button label="Sign In" onPress={handleSubmit} />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

// Custom Theme
export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider
        theme={{
          shadow: { offsetX: 6, offsetY: 6, color: '#1a1a2e' },
          colors: {
            primary: '#e94560',
            primaryForeground: '#ffffff',
            background: '#f5f5f5',
          },
          border: { radius: 16 },
        }}
      >
        <View style={{ padding: 20, minHeight: 400 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button label="Open Styled Dialog" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Styled</DialogTitle>
          <DialogDescription>
            This dialog uses custom theme settings.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button label="Close" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// No Shadow
export const NoShadow: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button label="Open Flat Dialog" />
      </DialogTrigger>
      <DialogContent shadowStyle={null}>
        <DialogHeader>
          <DialogTitle>Flat Design</DialogTitle>
          <DialogDescription>
            This dialog has no shadow effect.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button label="Done" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
