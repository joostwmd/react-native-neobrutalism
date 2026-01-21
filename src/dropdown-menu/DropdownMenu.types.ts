import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, StyleProp, ModalProps } from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

export interface DropdownMenuProps {
  /** Child components */
  children: ReactNode;

  /** Controlled open state */
  open?: boolean;

  /** Default open state */
  defaultOpen?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;

  /** Component-level theme overrides */
  themeOverride?: NeobrutalismThemeOverride;
}

export interface DropdownMenuTriggerProps {
  /** Trigger content */
  children: ReactNode;

  /** If true, clones child and merges onPress */
  asChild?: boolean;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Disable the trigger */
  disabled?: boolean;

  /** Accessibility label */
  accessibilityLabel?: string;
}

export interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export interface DropdownMenuContentProps {
  /** Content children (Items, Labels, Separators) */
  children: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override overlay styles */
  overlayStyle?: StyleProp<ViewStyle>;

  /** Modal animation type */
  animationType?: ModalProps['animationType'];

  /** Alignment relative to trigger */
  align?: 'start' | 'center' | 'end';

  /** Side offset from trigger */
  sideOffset?: number;

  /** Accessibility label */
  accessibilityLabel?: string;
}

export interface DropdownMenuItemProps {
  /** Item label */
  label?: string;

  /** Custom content */
  children?: ReactNode;

  /** Called when item is pressed */
  onPress?: () => void;

  /** Disable this item */
  disabled?: boolean;

  /** Icon on the left */
  icon?: ReactNode;

  /** Keyboard shortcut hint (display only) */
  shortcut?: string;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text styles */
  textStyle?: StyleProp<TextStyle>;

  /** Override shortcut text styles */
  shortcutStyle?: StyleProp<TextStyle>;

  /** Destructive action styling (red) */
  destructive?: boolean;
}

export interface DropdownMenuCheckboxItemProps {
  /** Item label */
  label?: string;

  /** Custom content */
  children?: ReactNode;

  /** Checked state */
  checked?: boolean;

  /** Called when checked state changes */
  onCheckedChange?: (checked: boolean) => void;

  /** Disable this item */
  disabled?: boolean;

  /** Keyboard shortcut hint */
  shortcut?: string;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text styles */
  textStyle?: StyleProp<TextStyle>;
}

export interface DropdownMenuLabelProps {
  /** Label text */
  children: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text styles */
  textStyle?: StyleProp<TextStyle>;
}

export interface DropdownMenuSeparatorProps {
  /** Override styles */
  style?: StyleProp<ViewStyle>;
}

export interface DropdownMenuContextValue {
  /** Open state */
  open: boolean;

  /** Set open state */
  setOpen: (open: boolean) => void;

  /** Trigger layout for positioning */
  triggerLayout: TriggerLayout | null;

  /** Set trigger layout */
  setTriggerLayout: (layout: TriggerLayout) => void;

  /** Theme overrides */
  themeOverride?: NeobrutalismThemeOverride;
}
