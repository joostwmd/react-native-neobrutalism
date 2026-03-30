import type { ReactNode } from 'react';
import type {
  ViewStyle,
  TextStyle,
  StyleProp,
  PressableProps,
} from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

export type SwitchSize = 'small' | 'default' | 'large';

export interface SwitchProps extends Omit<
  PressableProps,
  'children' | 'style'
> {
  /** Controlled checked (on) state */
  checked?: boolean;

  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;

  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;

  /** Disabled state */
  disabled?: boolean;

  /** Label text or custom content */
  label?: ReactNode;

  /** Position of label relative to the switch */
  labelPosition?: 'left' | 'right';

  /** Size variant */
  size?: SwitchSize;

  /** Override row container styles */
  style?: StyleProp<ViewStyle>;

  /** Override track styles */
  trackStyle?: StyleProp<ViewStyle>;

  /** Override thumb styles */
  thumbStyle?: StyleProp<ViewStyle>;

  /** Override label text styles */
  labelStyle?: StyleProp<TextStyle>;

  /** Component-level theme overrides */
  themeOverride?: NeobrutalismThemeOverride;

  /** Accessibility label for the switch */
  accessibilityLabel?: string;
}

export interface UseSwitchAnimationOptions {
  /** Whether the switch is on */
  checked: boolean;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Horizontal travel distance for the thumb (pixels) */
  thumbMaxTranslate: number;
  /** Track fill color when off */
  trackColorOff: string;
  /** Track fill color when on */
  trackColorOn: string;
}

export interface UseSwitchAnimationReturn {
  /** Animated style for thumb horizontal translation */
  thumbTranslateStyle: StyleProp<ViewStyle>;
  /** Animated style for track background color */
  trackColorStyle: StyleProp<ViewStyle>;
}
