import type { ReactNode } from 'react';
import type { ViewStyle, StyleProp, ModalProps } from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

export interface PopoverProps {
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

export interface PopoverTriggerProps {
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

export interface PopoverContentProps {
  /** Content children */
  children: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override overlay styles */
  overlayStyle?: StyleProp<ViewStyle>;

  /** Modal animation type */
  animationType?: ModalProps['animationType'];

  /** Alignment relative to trigger */
  align?: 'start' | 'center' | 'end';

  /** Side to open on */
  side?: 'top' | 'bottom';

  /** Offset from trigger */
  sideOffset?: number;

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

export interface PopoverContextValue {
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
