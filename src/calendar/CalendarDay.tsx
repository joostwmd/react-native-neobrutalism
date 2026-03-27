import { useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useCalendarContext } from './CalendarContext';
import { useNeobrutalismTheme, themeFontStyle } from '../theme';
import { deepMerge } from '../utils';
import type { NeobrutalismTheme } from '../theme/types';
import type { CalendarDayProps, CalendarTone } from './Calendar.types';

const DAY_SIZE = 40;

/**
 * Individual day cell component for the calendar
 */
export function CalendarDay({
  date,
  isOutsideMonth = false,
  style,
  textStyle,
}: CalendarDayProps): JSX.Element {
  const {
    tone,
    handleDateSelect,
    isDateDisabled,
    isDateSelected,
    isDateInRange,
    isRangeStart,
    isRangeEnd,
    themeOverride,
  } = useCalendarContext();

  const { theme: contextTheme } = useNeobrutalismTheme();
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  const isDisabled = isDateDisabled(date);
  const isSelected = isDateSelected(date);
  const isInRange = isDateInRange(date);
  const isStart = isRangeStart(date);
  const isEnd = isRangeEnd(date);
  const isToday = isSameDay(date, new Date());

  const handlePress = useCallback(() => {
    if (!isDisabled && !isOutsideMonth) handleDateSelect(date);
  }, [date, isDisabled, isOutsideMonth, handleDateSelect]);

  const toneColors = useMemo(() => getToneColors(tone, theme), [tone, theme]);

  const cellStyle: ViewStyle = useMemo(() => {
    const baseStyle: ViewStyle = {
      width: DAY_SIZE,
      height: DAY_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.border.radius,
    };

    if (isOutsideMonth) {
      return {
        ...baseStyle,
        opacity: 0.3,
      };
    }

    if (isDisabled) {
      return {
        ...baseStyle,
        opacity: 0.4,
      };
    }

    if (isSelected || isStart || isEnd) {
      return {
        ...baseStyle,
        backgroundColor: toneColors.selected,
        borderWidth: theme.border.width,
        borderColor: theme.border.color,
      };
    }

    if (isInRange) {
      return {
        ...baseStyle,
        backgroundColor: toneColors.range,
        borderRadius: 0,
      };
    }

    if (isToday) {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.secondary,
        borderWidth: theme.border.width,
        borderColor: theme.border.color,
      };
    }

    return baseStyle;
  }, [
    theme,
    toneColors,
    isOutsideMonth,
    isDisabled,
    isSelected,
    isInRange,
    isStart,
    isEnd,
    isToday,
  ]);

  const dayTextStyle: TextStyle = useMemo(() => {
    const baseStyle: TextStyle = {
      ...themeFontStyle(theme),
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.foreground,
    };

    if (isSelected || isStart || isEnd) {
      return {
        ...baseStyle,
        color: toneColors.selectedText,
        fontWeight: '600',
      };
    }

    if (isToday && !isInRange) {
      return {
        ...baseStyle,
        fontWeight: '700',
      };
    }

    return baseStyle;
  }, [theme, toneColors, isSelected, isStart, isEnd, isToday, isInRange]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled || isOutsideMonth}
      accessibilityRole="button"
      accessibilityLabel={`${date.toLocaleDateString()}`}
      accessibilityState={{
        disabled: isDisabled || isOutsideMonth,
        selected: isSelected,
      }}
    >
      <View style={[cellStyle, style]}>
        <Text style={[dayTextStyle, textStyle]}>{date.getDate()}</Text>
      </View>
    </Pressable>
  );
}

/**
 * Get colors based on tone
 */
function getToneColors(
  tone: CalendarTone,
  theme: NeobrutalismTheme
): { selected: string; selectedText: string; range: string } {
  if (tone === 'primary') {
    return {
      selected: theme.colors.primary,
      selectedText: theme.colors.primaryForeground,
      range: `${theme.colors.primary}40`, // 25% opacity
    };
  }

  // neutral
  return {
    selected: theme.colors.foreground,
    selectedText: theme.colors.background,
    range: `${theme.colors.secondary}80`, // 50% opacity
  };
}

/**
 * Check if two dates are the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
