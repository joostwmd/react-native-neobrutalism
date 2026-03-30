import { useState, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { useSwitchAnimation } from './useSwitchAnimation';
import { deepMerge } from '../utils/mergeStyles';
import type { SwitchProps, SwitchSize } from './Switch.types';
import type { NeobrutalismTheme } from '../theme/types';

type SwitchDimensions = {
  trackWidth: number;
  trackHeight: number;
  thumbDiameter: number;
};

const sizeDimensions: Record<SwitchSize, SwitchDimensions> = {
  small: { trackWidth: 40, trackHeight: 24, thumbDiameter: 18 },
  default: { trackWidth: 52, trackHeight: 30, thumbDiameter: 22 },
  large: { trackWidth: 64, trackHeight: 36, thumbDiameter: 28 },
};

function computeThumbInset(
  trackHeight: number,
  borderWidth: number,
  thumbDiameter: number
): number {
  const innerHeight = trackHeight - 2 * borderWidth;
  return Math.max(0, (innerHeight - thumbDiameter) / 2);
}

function computeThumbMaxTranslate(
  trackWidth: number,
  trackHeight: number,
  borderWidth: number,
  thumbDiameter: number
): number {
  const innerWidth = trackWidth - 2 * borderWidth;
  const inset = computeThumbInset(trackHeight, borderWidth, thumbDiameter);
  return Math.max(0, innerWidth - thumbDiameter - 2 * inset);
}

/**
 * Neobrutalism styled switch (toggle) with animated thumb and track fill.
 *
 * @example
 * ```tsx
 * <Switch label="Notifications" onCheckedChange={(on) => console.log(on)} />
 * <Switch checked={on} onCheckedChange={setOn} size="large" />
 * ```
 */
export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
  labelPosition = 'right',
  size = 'default',
  style,
  trackStyle,
  thumbStyle,
  labelStyle,
  themeOverride,
  accessibilityLabel,
  ...pressableProps
}: SwitchProps): JSX.Element {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = controlledChecked ?? internalChecked;

  const { theme: contextTheme } = useNeobrutalismTheme();
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  const { trackWidth, trackHeight, thumbDiameter } = sizeDimensions[size];
  const borderWidth = theme.border.width;
  const thumbInset = computeThumbInset(
    trackHeight,
    borderWidth,
    thumbDiameter
  );
  const thumbMaxTranslate = computeThumbMaxTranslate(
    trackWidth,
    trackHeight,
    borderWidth,
    thumbDiameter
  );

  const { thumbTranslateStyle, trackColorStyle } = useSwitchAnimation({
    checked,
    duration: theme.animation.duration,
    thumbMaxTranslate,
    trackColorOff: theme.colors.background,
    trackColorOn: theme.colors.primary,
  });

  const handlePress = useCallback(() => {
    if (disabled) return;
    const next = !checked;
    setInternalChecked(next);
    onCheckedChange?.(next);
  }, [checked, disabled, onCheckedChange]);

  const trackStaticStyle: ViewStyle = useMemo(
    () => ({
      width: trackWidth,
      height: trackHeight,
      borderRadius: trackHeight / 2,
      borderWidth,
      borderColor: theme.border.color,
      overflow: 'hidden',
      opacity: disabled ? 0.5 : 1,
    }),
    [
      trackWidth,
      trackHeight,
      borderWidth,
      theme.border.color,
      disabled,
    ]
  );

  const thumbStaticStyle: ViewStyle = useMemo(
    () => ({
      position: 'absolute',
      left: thumbInset,
      top: thumbInset,
      width: thumbDiameter,
      height: thumbDiameter,
      borderRadius: thumbDiameter / 2,
      borderWidth,
      borderColor: theme.border.color,
      backgroundColor: theme.colors.background,
    }),
    [
      thumbInset,
      thumbDiameter,
      borderWidth,
      theme.border.color,
      theme.colors.background,
    ]
  );

  const computedLabelStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
      color: theme.colors.foreground,
      opacity: disabled ? 0.5 : 1,
    }),
    [size, disabled, theme]
  );

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    }),
    [theme.spacing.sm]
  );

  const renderLabel = (): JSX.Element | null => {
    if (!label) return null;
    if (typeof label === 'string') {
      return <Text style={[computedLabelStyle, labelStyle]}>{label}</Text>;
    }
    return <>{label}</>;
  };

  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    if (typeof label === 'string') return label;
    return undefined;
  }, [accessibilityLabel, label]);

  const switchControl = (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityLabel={computedAccessibilityLabel}
      accessibilityState={{ checked, disabled }}
      {...pressableProps}
    >
      <Animated.View style={[trackStaticStyle, trackColorStyle, trackStyle]}>
        <Animated.View
          style={[thumbStaticStyle, thumbTranslateStyle, thumbStyle]}
        />
      </Animated.View>
    </Pressable>
  );

  return (
    <View style={[containerStyle, style]}>
      {label && labelPosition === 'left' && renderLabel()}
      {switchControl}
      {label && labelPosition === 'right' && renderLabel()}
    </View>
  );
}
