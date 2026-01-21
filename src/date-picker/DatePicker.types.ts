import type { ViewStyle, TextStyle, StyleProp } from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

export interface DatePickerProps {
  /** Controlled selected date value */
  value?: Date;

  /** Default selected date for uncontrolled usage */
  defaultValue?: Date;

  /** Callback when date selection changes */
  onValueChange?: (date: Date | undefined) => void;

  /** Placeholder text when no date is selected */
  placeholder?: string;

  /** Custom date formatter function */
  formatDate?: (date: Date) => string;

  /** Minimum selectable date */
  minDate?: Date;

  /** Maximum selectable date */
  maxDate?: Date;

  /** Array of disabled dates */
  disabledDates?: Date[];

  /** Disable the date picker */
  disabled?: boolean;

  /** Override trigger button styles */
  triggerStyle?: StyleProp<ViewStyle>;

  /** Override trigger text styles */
  triggerTextStyle?: StyleProp<TextStyle>;

  /** Override trigger shadow styles (null to hide) */
  triggerShadowStyle?: StyleProp<ViewStyle> | null;

  /** Override calendar container styles */
  calendarStyle?: ViewStyle;

  /** Override popover content styles */
  popoverStyle?: StyleProp<ViewStyle>;

  /** Component-level theme overrides */
  themeOverride?: NeobrutalismThemeOverride;

  /** Accessibility label for the trigger */
  accessibilityLabel?: string;
}
