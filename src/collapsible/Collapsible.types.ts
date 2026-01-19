import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, StyleProp } from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

export interface CollapsibleProps {
  /** Child components (CollapsibleTrigger and CollapsibleContent) */
  children: ReactNode;

  /** Controlled open state */
  open?: boolean;

  /** Default open state for uncontrolled usage */
  defaultOpen?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;

  /** Disable interaction */
  disabled?: boolean;

  /** Component-level theme overrides */
  themeOverride?: NeobrutalismThemeOverride;

  /** Container styles */
  style?: StyleProp<ViewStyle>;
}

export interface CollapsibleTriggerProps {
  /** Trigger content (text or custom element) */
  children: ReactNode;

  /** If true, clones child and merges onPress instead of wrapping */
  asChild?: boolean;

  /** Show chevron indicator */
  showChevron?: boolean;

  /** Custom chevron icon */
  chevronIcon?: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text styles (when children is string) */
  textStyle?: StyleProp<TextStyle>;

  /** Accessibility label */
  accessibilityLabel?: string;
}

export interface CollapsibleContentProps {
  /** Content to show/hide */
  children: ReactNode;

  /** Force mount (keep rendered even when closed) */
  forceMount?: boolean;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;
}

export interface CollapsibleContextValue {
  /** Current open state */
  open: boolean;
  /** Function to update open state */
  setOpen: (open: boolean) => void;
  /** Whether the collapsible is disabled */
  disabled: boolean;
  /** Theme override from parent */
  themeOverride?: NeobrutalismThemeOverride;
}

export interface UseCollapsibleAnimationOptions {
  /** Whether the collapsible is expanded */
  isOpen: boolean;
  /** Animation duration in milliseconds */
  duration?: number;
}

export interface UseCollapsibleAnimationReturn {
  /** Animated style for content height */
  heightStyle: StyleProp<ViewStyle>;
  /** Animated style for chevron rotation */
  chevronStyle: StyleProp<ViewStyle>;
  /** Function to set measured content height */
  setContentHeight: (height: number) => void;
}
