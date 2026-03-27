import React, { useMemo, useCallback, useRef } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View, Animated, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { useButtonAnimation } from '../buttons/useButtonAnimation';
import { deepMerge } from '../utils/mergeStyles';
import { useComboboxContext } from './ComboboxContext';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import type { ComboboxTriggerProps } from './Combobox.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Trigger button for the Combobox dropdown.
 *
 * @example
 * ```tsx
 * // Default trigger showing selected value
 * <ComboboxTrigger />
 *
 * // Custom content
 * <ComboboxTrigger>
 *   <Text>Custom trigger</Text>
 * </ComboboxTrigger>
 *
 * // Using asChild
 * <ComboboxTrigger asChild>
 *   <Button label="Select" />
 * </ComboboxTrigger>
 * ```
 */
export function ComboboxTrigger({
  children,
  asChild = false,
  showIndicator = true,
  indicatorIcon,
  style,
  textStyle,
  shadowStyle,
  accessibilityLabel,
}: ComboboxTriggerProps): JSX.Element {
  const {
    open,
    setOpen,
    disabled,
    selectedValues,
    options,
    placeholder,
    themeOverride,
    setTriggerLayout,
  } = useComboboxContext();

  const { theme: contextTheme } = useNeobrutalismTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const triggerRef = useRef<any>(null);

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Get button press animation
  const { translateX, translateY, shadowOpacity, onPressIn, onPressOut } =
    useButtonAnimation({
      shadow: theme.shadow,
      animation: theme.animation,
      disabled,
    });

  // Get display label for selected values
  const displayLabel = useMemo(() => {
    if (selectedValues.length === 0) return placeholder;
    const selectedOptions = options.filter((o) =>
      selectedValues.includes(o.value)
    );
    if (selectedOptions.length === 0) {
      // Values exist but options haven't registered yet, show values
      return selectedValues.join(', ');
    }
    return selectedOptions.map((o) => o.label).join(', ');
  }, [selectedValues, options, placeholder]);

  // Handle press - measure trigger and open
  const handlePress = useCallback(() => {
    if (disabled) return;

    // Measure trigger position before opening
    if (triggerRef.current) {
      triggerRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          setTriggerLayout({
            x: 0,
            y: 0,
            width,
            height,
            pageX: x,
            pageY: y,
          });
          setOpen(!open);
        }
      );
    } else {
      setOpen(!open);
    }
  }, [disabled, open, setOpen, setTriggerLayout]);

  // Trigger container styles
  const triggerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      minHeight: theme.buttonSizes.default.minHeight,
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      opacity: disabled ? 0.5 : 1,
    }),
    [theme, disabled]
  );

  // Shadow styles
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
  const labelStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      flex: 1,
      fontSize: 16,
      color: theme.colors.foreground,
      opacity: selectedValues.length > 0 ? 1 : 0.6,
    }),
    [selectedValues.length, theme.colors.foreground]
  );

  // Determine if shadow should be shown
  const showShadow = shadowStyle !== null;

  // If asChild, clone child and merge onPress
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onPress?: () => void;
      accessibilityRole?: string;
      accessibilityState?: object;
      accessibilityLabel?: string;
    }>;

    return React.cloneElement(child, {
      onPress: handlePress,
      accessibilityRole: 'combobox',
      accessibilityState: { expanded: open, disabled },
      accessibilityLabel: accessibilityLabel ?? child.props.accessibilityLabel,
    });
  }

  return (
    <View ref={triggerRef} style={styles.wrapper} collapsable={false}>
      {/* Shadow layer */}
      {showShadow && (
        <Animated.View
          style={[computedShadowStyle, shadowStyle, { opacity: shadowOpacity }]}
        />
      )}

      {/* Trigger layer */}
      <Animated.View style={{ transform: [{ translateX }, { translateY }] }}>
        <Pressable
          onPress={handlePress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          disabled={disabled}
          accessibilityRole="combobox"
          accessibilityState={{ expanded: open, disabled }}
          accessibilityLabel={accessibilityLabel ?? displayLabel}
          style={[triggerStyle, style]}
        >
          {children ?? (
            <Text style={[labelStyle, textStyle]} numberOfLines={1}>
              {displayLabel}
            </Text>
          )}

          {showIndicator && (
            <View style={styles.indicator}>
              {indicatorIcon ?? (
                <ChevronDownIcon size={20} color={theme.colors.foreground} />
              )}
            </View>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  indicator: {
    marginLeft: 8,
  },
});
