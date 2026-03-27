import { useMemo } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View, Animated, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { useButtonAnimation } from './useButtonAnimation';
import { deepMerge } from '../utils/mergeStyles';
import type { ButtonProps, ButtonVariant } from './Button.types';
import type { NeobrutalismTheme, NeobrutalismColors } from '../theme/types';

// Map variant to background color keys
const variantColorMap: Record<ButtonVariant, keyof NeobrutalismColors> = {
  primary: 'primary',
  secondary: 'secondary',
  warning: 'warning',
  danger: 'danger',
  success: 'success',
  outlined: 'background',
};

// Map variant to foreground (text) color keys
const variantForegroundMap: Record<ButtonVariant, keyof NeobrutalismColors> = {
  primary: 'primaryForeground',
  secondary: 'secondaryForeground',
  warning: 'warningForeground',
  danger: 'dangerForeground',
  success: 'successForeground',
  outlined: 'foreground',
};

/**
 * Neobrutalism styled button component with multiple variants, sizes, and press animation.
 *
 * @example
 * ```tsx
 * <Button label="Click me" variant="primary" onPress={() => {}} />
 * <Button label="Delete" variant="danger" size="small" />
 * <Button label="Outlined" variant="outlined" />
 * ```
 */
export function Button({
  label,
  variant = 'primary',
  size = 'default',
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  shadowStyle,
  themeOverride,
  disableAnimation = false,
  onPress,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  accessibilityLabel,
  ...pressableProps
}: ButtonProps): JSX.Element {
  // Get theme from context (or default)
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Get animation handlers
  const { translateX, translateY, shadowOpacity, onPressIn, onPressOut } =
    useButtonAnimation({
      shadow: theme.shadow,
      animation: theme.animation,
      disabled: disabled || disableAnimation,
    });

  // Handle combined press events
  const handlePressIn = useMemo(
    () => (): void => {
      onPressIn();
      onPressInProp?.({} as never);
    },
    [onPressIn, onPressInProp]
  );

  const handlePressOut = useMemo(
    () => (): void => {
      onPressOut();
      onPressOutProp?.({} as never);
    },
    [onPressOut, onPressOutProp]
  );

  // Compute styles based on variant and size
  const buttonSize = theme.buttonSizes[size];
  const backgroundColor = theme.colors[variantColorMap[variant]];
  const textColor = theme.colors[variantForegroundMap[variant]];

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      paddingHorizontal: buttonSize.paddingHorizontal,
      paddingVertical: buttonSize.paddingVertical,
      minHeight: buttonSize.minHeight,
      backgroundColor: variant === 'outlined' ? 'transparent' : backgroundColor,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      opacity: disabled ? 0.5 : 1,
    }),
    [buttonSize, backgroundColor, theme.border, variant, disabled]
  );

  // Shadow styles (positioned behind button)
  const computedShadowStyle: ViewStyle = useMemo(
    () => ({
      position: 'absolute',
      top: theme.shadow.offsetY,
      left: theme.shadow.offsetX,
      right: -theme.shadow.offsetX,
      bottom: -theme.shadow.offsetY,
      backgroundColor: theme.shadow.color,
      borderRadius: theme.border.radius,
    }),
    [theme.shadow, theme.border.radius]
  );

  // Text styles
  const computedTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: buttonSize.fontSize,
      fontWeight: '600',
      color: textColor,
    }),
    [buttonSize.fontSize, textColor]
  );

  // Determine if shadow should be shown
  const showShadow = shadowStyle !== null && variant !== 'outlined';

  return (
    <View style={[styles.wrapper, fullWidth && styles.fullWidth]}>
      {/* Shadow layer */}
      {showShadow && (
        <Animated.View
          style={[computedShadowStyle, shadowStyle, { opacity: shadowOpacity }]}
        />
      )}

      {/* Button layer */}
      <Animated.View style={{ transform: [{ translateX }, { translateY }] }}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{ disabled }}
          style={[containerStyle, style]}
          {...pressableProps}
        >
          {leftIcon != null && <View>{leftIcon}</View>}
          <Text style={[computedTextStyle, textStyle]}>{label}</Text>
          {rightIcon != null && <View>{rightIcon}</View>}
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
});
