import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, StyleProp, ModalProps } from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

export interface ContextMenuProps {
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

export interface ContextMenuTriggerProps {
  /** Content that triggers the context menu on right-click (web) or long press (native) */
  children: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Disable the trigger */
  disabled?: boolean;

  /** Long press duration in ms for native platforms (default: 500) */
  delayLongPress?: number;

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

export interface ContextMenuContentProps {
  /** Content children (Items, Labels, Separators) */
  children: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override overlay styles */
  overlayStyle?: StyleProp<ViewStyle>;

  /** Modal animation type */
  animationType?: ModalProps['animationType'];

  /** Accessibility label */
  accessibilityLabel?: string;
}

export interface ContextMenuItemProps {
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

export interface ContextMenuCheckboxItemProps {
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

export interface ContextMenuLabelProps {
  /** Label text */
  children: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text styles */
  textStyle?: StyleProp<TextStyle>;
}

export interface ContextMenuSeparatorProps {
  /** Override styles */
  style?: StyleProp<ViewStyle>;
}

export interface ContextMenuContextValue {
  /** Open state */
  open: boolean;

  /** Set open state */
  setOpen: (open: boolean) => void;

  /** Trigger layout for positioning */
  triggerLayout: TriggerLayout | null;

  /** Set trigger layout */
  setTriggerLayout: (layout: TriggerLayout) => void;

  /** Press position for positioning menu at touch point */
  pressPosition: { x: number; y: number } | null;

  /** Set press position */
  setPressPosition: (position: { x: number; y: number } | null) => void;

  /** Theme overrides */
  themeOverride?: NeobrutalismThemeOverride;
}
