import { useMemo, useCallback, useRef } from 'react';
import type { JSX } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useCalendarContext } from './CalendarContext';
import { useNeobrutalismTheme, themeFontStyle } from '../theme';
import { deepMerge } from '../utils';
import type { NeobrutalismTheme } from '../theme/types';
import type { CalendarHeaderProps } from './Calendar.types';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Calendar header with month/year display and navigation
 */
export function CalendarHeader({
  style,
  textStyle,
}: CalendarHeaderProps): JSX.Element {
  const { currentMonth, goToPreviousMonth, goToNextMonth, themeOverride } =
    useCalendarContext();

  const { theme: contextTheme } = useNeobrutalismTheme();
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  const monthYear = `${MONTH_NAMES[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.md,
    }),
    [theme.spacing]
  );

  const titleStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.foreground,
    }),
    [theme]
  );

  return (
    <View style={[containerStyle, style]}>
      <NavButton
        direction="left"
        onPress={goToPreviousMonth}
        theme={theme}
        accessibilityLabel="Previous month"
      />
      <Text style={[titleStyle, textStyle]}>{monthYear}</Text>
      <NavButton
        direction="right"
        onPress={goToNextMonth}
        theme={theme}
        accessibilityLabel="Next month"
      />
    </View>
  );
}

interface NavButtonProps {
  direction: 'left' | 'right';
  onPress: () => void;
  theme: NeobrutalismTheme;
  accessibilityLabel: string;
}

/**
 * Navigation button with neobrutalism styling
 */
function NavButton({
  direction,
  onPress,
  theme,
  accessibilityLabel,
}: NavButtonProps): JSX.Element {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const handlePressIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: theme.shadow.offsetY / 2,
        duration: theme.animation.duration,
        useNativeDriver: theme.animation.useNativeDriver,
      }),
      Animated.timing(translateX, {
        toValue: theme.shadow.offsetX / 2,
        duration: theme.animation.duration,
        useNativeDriver: theme.animation.useNativeDriver,
      }),
    ]).start();
  }, [theme, translateY, translateX]);

  const handlePressOut = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: theme.animation.duration,
        useNativeDriver: theme.animation.useNativeDriver,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: theme.animation.duration,
        useNativeDriver: theme.animation.useNativeDriver,
      }),
    ]).start();
  }, [theme, translateY, translateX]);

  const buttonStyle: ViewStyle = useMemo(
    () => ({
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
    }),
    [theme]
  );

  const shadowStyle: ViewStyle = useMemo(
    () => ({
      position: 'absolute',
      top: theme.shadow.offsetY,
      left: theme.shadow.offsetX,
      right: -theme.shadow.offsetX,
      bottom: -theme.shadow.offsetY,
      backgroundColor: theme.shadow.color,
      borderRadius: theme.border.radius,
    }),
    [theme]
  );

  const chevron = direction === 'left' ? '<' : '>';

  const chevronTextStyle = useMemo(
    () => [themeFontStyle(theme), styles.chevronText],
    [theme]
  );

  return (
    <View style={styles.navButtonWrapper}>
      <View style={shadowStyle} />
      <Animated.View
        style={{
          transform: [{ translateX }, { translateY }],
        }}
      >
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={buttonStyle}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
        >
          <Text style={chevronTextStyle}>{chevron}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  navButtonWrapper: {
    position: 'relative',
  },
  chevronText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
});
