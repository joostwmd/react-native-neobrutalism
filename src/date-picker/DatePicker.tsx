import { useState, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { Popover, PopoverTrigger, PopoverContent } from '../popover';
import { Calendar } from '../calendar';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import type { NeobrutalismTheme } from '../theme/types';
import type { DatePickerProps } from './DatePicker.types';

/**
 * Default date formatter using native toLocaleDateString
 */
const defaultFormatDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * DatePicker component that composes Popover, Button, and Calendar.
 *
 * Provides a button trigger that opens a calendar popover for date selection.
 *
 * @example
 * ```tsx
 * const [date, setDate] = useState<Date | undefined>();
 *
 * <DatePicker
 *   value={date}
 *   onValueChange={setDate}
 *   placeholder="Pick a date"
 * />
 * ```
 */
export function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Pick a date',
  formatDate = defaultFormatDate,
  minDate,
  maxDate,
  disabledDates,
  disabled = false,
  triggerStyle,
  triggerTextStyle,
  triggerShadowStyle: _triggerShadowStyle,
  calendarStyle,
  popoverStyle,
  themeOverride,
  accessibilityLabel: _accessibilityLabel,
}: DatePickerProps): JSX.Element {
  const { theme: contextTheme } = useNeobrutalismTheme();
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue
  );

  // Popover open state
  const [open, setOpen] = useState(false);

  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const selectedDate = isControlled ? value : internalValue;

  // Handle date selection
  const handleSelect = useCallback(
    (date: Date | undefined) => {
      if (!isControlled) setInternalValue(date);

      onValueChange?.(date);
      setOpen(false);
    },
    [isControlled, onValueChange]
  );

  // Display text
  const displayText = selectedDate ? formatDate(selectedDate) : placeholder;

  // Trigger text styles
  const computedTriggerTextStyle: TextStyle = useMemo(
    () => ({
      color: selectedDate
        ? theme.colors.foreground
        : theme.colors.secondaryForeground,
      textAlign: 'left',
    }),
    [selectedDate, theme.colors.foreground, theme.colors.secondaryForeground]
  );

  // Calendar icon
  const calendarIcon = useMemo(
    () => (
      <View style={styles.iconContainer}>
        <Text
          style={[styles.icon, { color: theme.colors.secondaryForeground }]}
        >
          📅
        </Text>
      </View>
    ),
    [theme.colors.secondaryForeground]
  );

  // Popover content style
  const popoverContentStyle: ViewStyle = useMemo(
    () => ({
      padding: 0,
    }),
    []
  );

  return (
    <Popover open={open} onOpenChange={setOpen} themeOverride={themeOverride}>
      <PopoverTrigger disabled={disabled}>
        <View style={[styles.triggerContainer, triggerStyle]}>
          <View style={styles.triggerContent}>
            {calendarIcon}
            <Text
              style={[computedTriggerTextStyle, triggerTextStyle]}
              numberOfLines={1}
            >
              {displayText}
            </Text>
          </View>
        </View>
      </PopoverTrigger>
      <PopoverContent
        style={[popoverContentStyle, popoverStyle]}
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          style={calendarStyle}
          shadowStyle={null}
          themeOverride={themeOverride}
        />
      </PopoverContent>
    </Popover>
  );
}

const styles = StyleSheet.create({
  triggerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: 240,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    marginRight: 4,
  },
  icon: {
    fontSize: 16,
  },
});
