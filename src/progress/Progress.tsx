import { useMemo } from 'react';
import type { JSX } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
// import Animated from 'react-native-reanimated';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import type { ProgressProps, ProgressVariant } from './Progress.types';
import type { NeobrutalismTheme, NeobrutalismColors } from '../theme/types';
// import { useProgressAnimation } from './useProgressAnimation';

const variantColorMap: Record<ProgressVariant, keyof NeobrutalismColors> = {
  primary: 'primary',
  secondary: 'secondary',
  warning: 'warning',
  danger: 'danger',
  success: 'success',
};

/**
 * Neobrutalism styled progress bar component.
 *
 * @example
 * ```tsx
 * <Progress value={50} />
 * <Progress value={75} variant="success" />
 * <Progress indeterminate />
 * ```
 */
export function Progress({
  value = 0,
  max = 100,
  variant = 'primary',
  direction = 'left-to-right',
  indeterminate = false,
  duration: _duration,
  style,
  themeOverride,
  accessibilityLabel,
}: ProgressProps): JSX.Element {
  const { theme: contextTheme } = useNeobrutalismTheme();
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Animation temporarily disabled for debugging
  // const animDuration = duration ?? theme.animation.duration;
  // const { fillStyle } = useProgressAnimation({
  //   value,
  //   indeterminate,
  //   duration: animDuration,
  // });

  const fillColor = theme.colors[variantColorMap[variant]];
  const percentage =
    max <= 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  const fillWidth = indeterminate ? 100 : percentage;
  const isFull = fillWidth >= 99.99;
  const isEmpty = fillWidth <= 0.01;

  const innerRadius = Math.max(0, theme.border.radius - theme.border.width);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      alignSelf: 'stretch',
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      overflow: 'hidden',
      padding: 0,
      minHeight: 24,
    }),
    [theme]
  );

  const fillContainerStyle: ViewStyle = useMemo(
    () => ({
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      position: 'relative' as const,
      minHeight: 20,
      alignSelf: 'stretch',
    }),
    []
  );

  const isRightToLeft = direction === 'right-to-left';
  const fillBaseStyle: ViewStyle = useMemo(
    () => ({
      width: `${fillWidth}%`,
      position: 'absolute' as const,
      left: isRightToLeft ? undefined : 0,
      right: isRightToLeft ? 0 : undefined,
      top: 0,
      bottom: 0,
      backgroundColor: fillColor,
      borderTopLeftRadius: isRightToLeft ? 0 : innerRadius,
      borderBottomLeftRadius: isRightToLeft ? 0 : innerRadius,
      borderTopRightRadius: isRightToLeft ? innerRadius : 0,
      borderBottomRightRadius: isRightToLeft ? innerRadius : 0,
      borderRightWidth: isRightToLeft
        ? 0
        : isFull || isEmpty
          ? 0
          : theme.border.width,
      borderRightColor: theme.border.color,
      borderLeftWidth: isRightToLeft
        ? isFull || isEmpty
          ? 0
          : theme.border.width
        : 0,
      borderLeftColor: theme.border.color,
    }),
    [
      fillWidth,
      fillColor,
      isRightToLeft,
      isFull,
      isEmpty,
      innerRadius,
      theme.border.width,
      theme.border.color,
    ]
  );

  return (
    <View
      style={[containerStyle, style]}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={fillContainerStyle}>
        {!isEmpty && <View style={fillBaseStyle} />}
      </View>
    </View>
  );
}
