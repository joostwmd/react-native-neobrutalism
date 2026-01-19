import type { ReactNode } from 'react';
import type {
  ViewStyle,
  TextStyle,
  StyleProp,
  PressableProps,
} from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

export type CheckboxSize = 'small' | 'default' | 'large';

export interface CheckboxProps extends Omit<
  PressableProps,
  'children' | 'style'
> {
  /** Controlled checked state */
  checked?: boolean;

  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;

  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;

  /** Disabled state */
  disabled?: boolean;

  /** Indeterminate state (neither fully checked nor unchecked) */
  indeterminate?: boolean;

  /** Label text or custom content */
  label?: ReactNode;

  /** Position of label relative to checkbox */
  labelPosition?: 'left' | 'right';

  /** Size variant */
  size?: CheckboxSize;

  /** Custom check icon */
  checkIcon?: ReactNode;

  /** Custom indeterminate icon */
  indeterminateIcon?: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override checkbox box styles */
  boxStyle?: StyleProp<ViewStyle>;

  /** Override label text styles */
  labelStyle?: StyleProp<TextStyle>;

  /** Component-level theme overrides */
  themeOverride?: NeobrutalismThemeOverride;

  /** Accessibility label for the checkbox */
  accessibilityLabel?: string;
}

export interface UseCheckboxAnimationOptions {
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Animation duration in milliseconds */
  duration?: number;
}

export interface UseCheckboxAnimationReturn {
  /** Animated style for scale transform */
  scaleStyle: StyleProp<ViewStyle>;
  /** Animated style for opacity */
  opacityStyle: StyleProp<ViewStyle>;
}
