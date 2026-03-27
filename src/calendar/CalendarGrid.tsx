import { useMemo } from 'react';
import type { JSX } from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { CalendarDay } from './CalendarDay';
import { useCalendarContext } from './CalendarContext';
import { useNeobrutalismTheme, themeFontStyle } from '../theme';
import { deepMerge } from '../utils';
import type { NeobrutalismTheme } from '../theme/types';
import type { CalendarGridProps } from './Calendar.types';

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * Calendar grid showing weekday headers and day cells
 */
export function CalendarGrid({
  style,
  dayCellStyle,
  dayTextStyle,
}: CalendarGridProps): JSX.Element {
  const { currentMonth, showOutsideDays, themeOverride } = useCalendarContext();

  const { theme: contextTheme } = useNeobrutalismTheme();
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  const weeks = useMemo(
    () => getCalendarWeeks(currentMonth, showOutsideDays),
    [currentMonth, showOutsideDays]
  );

  const containerStyle: ViewStyle = useMemo(
    () => ({
      paddingHorizontal: theme.spacing.xs,
    }),
    [theme.spacing]
  );

  const weekdayTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.foreground,
      opacity: 0.6,
      textAlign: 'center',
      width: 40,
    }),
    [theme.colors.foreground]
  );

  return (
    <View style={[containerStyle, style]}>
      {/* Weekday headers */}
      <View style={styles.weekdayRow}>
        {WEEKDAY_NAMES.map((day) => (
          <Text key={day} style={weekdayTextStyle}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar weeks */}
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekRow}>
          {week.map((day, dayIndex) => {
            if (!day) return <View key={dayIndex} style={styles.emptyDay} />;

            const isOutsideMonth = day.getMonth() !== currentMonth.getMonth();

            return (
              <CalendarDay
                key={day.toISOString()}
                date={day}
                isOutsideMonth={isOutsideMonth}
                style={dayCellStyle}
                textStyle={dayTextStyle}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

/**
 * Generate calendar weeks for the given month
 */
function getCalendarWeeks(
  month: Date,
  showOutsideDays: boolean
): (Date | null)[][] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  // First day of the month
  const firstDay = new Date(year, monthIndex, 1);
  // Last day of the month
  const lastDay = new Date(year, monthIndex + 1, 0);

  // Day of week the month starts on (0 = Sunday)
  const startDayOfWeek = firstDay.getDay();
  // Total days in the month
  const daysInMonth = lastDay.getDate();

  const weeks: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = [];

  // Add days from previous month if needed
  if (showOutsideDays && startDayOfWeek > 0) {
    const prevMonth = new Date(year, monthIndex, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = startDayOfWeek - 1; i >= 0; i--)
      currentWeek.push(new Date(year, monthIndex - 1, prevMonthDays - i));
  } else {
    // Fill with nulls for empty cells
    for (let i = 0; i < startDayOfWeek; i++) currentWeek.push(null);
  }

  // Add days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(new Date(year, monthIndex, day));

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Add days from next month if needed
  if (currentWeek.length > 0) {
    const remainingDays = 7 - currentWeek.length;

    if (showOutsideDays) {
      for (let i = 1; i <= remainingDays; i++)
        currentWeek.push(new Date(year, monthIndex + 1, i));
    } else {
      for (let i = 0; i < remainingDays; i++) currentWeek.push(null);
    }

    weeks.push(currentWeek);
  }

  return weeks;
}

const styles = StyleSheet.create({
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
  emptyDay: {
    width: 40,
    height: 40,
  },
});
