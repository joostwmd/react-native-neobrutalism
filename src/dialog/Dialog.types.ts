import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, ModalProps } from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

/**
 * Root Dialog props
 */
export interface DialogProps {
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

/**
 * Dialog trigger props
 */
export interface DialogTriggerProps {
  /** Trigger element (usually a Button) */
  children: ReactNode;

  /** If true, merges onPress into child element instead of wrapping in Pressable */
  asChild?: boolean;
}

/**
 * Dialog content props
 */
export interface DialogContentProps {
  /** Content children */
  children: ReactNode;

  /** Override content container styles */
  style?: ViewStyle;

  /** Override overlay styles */
  overlayStyle?: ViewStyle;

  /** Override shadow styles, pass null to hide shadow */
  shadowStyle?: ViewStyle | null;

  /** Modal animation type */
  animationType?: ModalProps['animationType'];

  /** Whether to close on backdrop press (default: true) */
  closeOnBackdropPress?: boolean;

  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * Dialog header props
 */
export interface DialogHeaderProps {
  /** Header children (Title, Description, etc.) */
  children: ReactNode;

  /** Override styles */
  style?: ViewStyle;
}

/**
 * Dialog title props
 */
export interface DialogTitleProps {
  /** Title text or element */
  children: ReactNode;

  /** Override text styles */
  style?: TextStyle;
}

/**
 * Dialog description props
 */
export interface DialogDescriptionProps {
  /** Description text or element */
  children: ReactNode;

  /** Override text styles */
  style?: TextStyle;
}

/**
 * Dialog footer props
 */
export interface DialogFooterProps {
  /** Footer children (buttons, etc.) */
  children: ReactNode;

  /** Override styles */
  style?: ViewStyle;
}

/**
 * Dialog close button props
 */
export interface DialogCloseProps {
  /** Close button content (default: X icon) */
  children?: ReactNode;

  /** If true, merges onPress into child element instead of wrapping */
  asChild?: boolean;

  /** Press handler - called before closing */
  onPress?: () => void;

  /** Override button styles */
  style?: ViewStyle;
}

/**
 * Context value for Dialog state
 */
export interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  themeOverride?: NeobrutalismThemeOverride;
}
