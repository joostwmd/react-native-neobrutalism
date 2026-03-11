import type { ViewStyle } from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

export type ProgressVariant =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'success';

export type ProgressDirection = 'left-to-right' | 'right-to-left';

export interface UseProgressAnimationOptions {
  value: number;
  indeterminate: boolean;
  duration: number;
}

export interface UseProgressAnimationReturn {
  fillStyle: object; // StyleProp<ViewStyle> from useAnimatedStyle
}

export interface ProgressProps {
  /** 0–100, required for determinate mode */
  value?: number;
  /** Visual variant (fill color) */
  variant?: ProgressVariant;
  /** Fill direction: left-to-right (default) or right-to-left */
  direction?: ProgressDirection;
  /** Indeterminate mode (ignores value, shows looping animation) */
  indeterminate?: boolean;
  /** Animation duration in ms */
  duration?: number;

  style?: ViewStyle;
  themeOverride?: NeobrutalismThemeOverride;
  accessibilityLabel?: string;
}
