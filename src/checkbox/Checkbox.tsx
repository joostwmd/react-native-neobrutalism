import { useState, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { useCheckboxAnimation } from './useCheckboxAnimation';
import { deepMerge } from '../utils/mergeStyles';
import { CheckIcon } from '../icons/CheckIcon';
import { MinusIcon } from '../icons/MinusIcon';
import type { CheckboxProps, CheckboxSize } from './Checkbox.types';
import type { NeobrutalismTheme } from '../theme/types';

// Size mapping for checkbox box dimensions
const sizeMap: Record<CheckboxSize, number> = {
  small: 16,
  default: 20,
  large: 24,
};

// Icon size mapping
const iconSizeMap: Record<CheckboxSize, number> = {
  small: 10,
  default: 14,
  large: 18,
};

/**
 * Neobrutalism styled checkbox component with optional label and animation.
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Checkbox label="Accept terms" onCheckedChange={(checked) => console.log(checked)} />
 *
 * // Controlled
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked} label="Subscribe" />
 *
 * // With indeterminate state
 * <Checkbox indeterminate label="Select all" />
 * ```
 */
export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  indeterminate = false,
  label,
  labelPosition = 'right',
  size = 'default',
  checkIcon,
  indeterminateIcon,
  style,
  boxStyle,
  labelStyle,
  themeOverride,
  accessibilityLabel,
  ...pressableProps
}: CheckboxProps): JSX.Element {
  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // Use controlled value if provided, otherwise use internal state
  const checked = controlledChecked ?? internalChecked;

  // Get theme from context (or default)
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Get checkbox animation
  const { scaleStyle, opacityStyle } = useCheckboxAnimation({
    checked: checked || indeterminate,
    duration: theme.animation.duration,
  });

  // Handle toggle
  const handlePress = useCallback(() => {
    if (disabled) return;
    const newChecked = !checked;
    setInternalChecked(newChecked);
    onCheckedChange?.(newChecked);
  }, [checked, disabled, onCheckedChange]);

  // Compute sizes
  const boxSize = sizeMap[size];
  const iconSize = iconSizeMap[size];

  // Box container styles
  const boxContainerStyle: ViewStyle = useMemo(
    () => ({
      width: boxSize,
      height: boxSize,
      backgroundColor:
        checked || indeterminate
          ? theme.colors.primary
          : theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius / 2,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
    }),
    [boxSize, checked, indeterminate, theme, disabled]
  );

  // Label text styles
  const computedLabelStyle: TextStyle = useMemo(
    () => ({
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
      color: theme.colors.foreground,
      opacity: disabled ? 0.5 : 1,
    }),
    [size, disabled, theme.colors.foreground]
  );

  // Container styles with gap
  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    }),
    [theme.spacing.sm]
  );

  // Icon color
  const iconColor = theme.colors.primaryForeground;

  // Render the checkbox icon
  const renderIcon = (): JSX.Element => {
    if (indeterminate) {
      return indeterminateIcon ? (
        <>{indeterminateIcon}</>
      ) : (
        <MinusIcon size={iconSize} color={iconColor} />
      );
    }
    return checkIcon ? (
      <>{checkIcon}</>
    ) : (
      <CheckIcon size={iconSize} color={iconColor} />
    );
  };

  // Render label
  const renderLabel = (): JSX.Element | null => {
    if (!label) return null;

    if (typeof label === 'string')
      return <Text style={[computedLabelStyle, labelStyle]}>{label}</Text>;

    return <>{label}</>;
  };

  // Compute accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    if (typeof label === 'string') return label;
    return undefined;
  }, [accessibilityLabel, label]);

  // Determine accessibility state
  const accessibilityState = useMemo(
    () => ({
      checked: indeterminate ? ('mixed' as const) : checked,
      disabled,
    }),
    [checked, indeterminate, disabled]
  );

  return (
    <View style={[containerStyle, style]}>
      {label && labelPosition === 'left' && renderLabel()}

      <Pressable
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityLabel={computedAccessibilityLabel}
        accessibilityState={accessibilityState}
        style={[boxContainerStyle, boxStyle]}
        {...pressableProps}
      >
        {/* Check indicator with animation */}
        <Animated.View style={[styles.iconContainer, scaleStyle, opacityStyle]}>
          {renderIcon()}
        </Animated.View>
      </Pressable>

      {label && labelPosition === 'right' && renderLabel()}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
