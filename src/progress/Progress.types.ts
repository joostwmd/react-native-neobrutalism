import type { ViewStyle, StyleProp } from 'react-native';
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
  fillStyle: StyleProp<ViewStyle>;
}

export interface ProgressProps {
  /** Current progress (0 to max) */
  value?: number;
  /** Maximum value representing 100% */
  max?: number;
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
