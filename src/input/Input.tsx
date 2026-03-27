import { useState, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import type {
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TargetedEvent,
} from 'react-native';

type FocusEvent = NativeSyntheticEvent<TargetedEvent>;
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import type { InputProps } from './Input.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Neobrutalism styled text input component.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter your email" keyboardType="email-address" />
 * <Input placeholder="Password" secureTextEntry />
 * <Input placeholder="Disabled" editable={false} />
 * ```
 */
export function Input({
  style,
  inputStyle,
  themeOverride,
  error = false,
  fullWidth = false,
  editable = true,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  placeholderTextColor,
  ...textInputProps
}: InputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  // Get theme from context (or default)
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Handle focus
  const handleFocus = useCallback(
    (e: FocusEvent) => {
      setIsFocused(true);
      onFocusProp?.(e);
    },
    [onFocusProp]
  );

  // Handle blur
  const handleBlur = useCallback(
    (e: FocusEvent) => {
      setIsFocused(false);
      onBlurProp?.(e);
    },
    [onBlurProp]
  );

  // Determine border color based on state
  const borderColor = useMemo(() => {
    if (error) return theme.colors.danger;
    if (isFocused) return theme.colors.primary;
    return theme.border.color;
  }, [
    error,
    isFocused,
    theme.colors.danger,
    theme.colors.primary,
    theme.border.color,
  ]);

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor,
      borderRadius: theme.border.radius,
      opacity: editable ? 1 : 0.5,
    }),
    [theme.colors.background, theme.border, borderColor, editable]
  );

  // Text input styles
  const computedInputStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      flex: 1,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      fontSize: 16,
      color: theme.colors.foreground,
      minHeight: 44,
    }),
    [theme.spacing, theme.colors.foreground]
  );

  // Placeholder color
  const computedPlaceholderColor = useMemo(
    () => placeholderTextColor ?? `${theme.colors.foreground}80`,
    [placeholderTextColor, theme.colors.foreground]
  );

  return (
    <View style={[containerStyle, fullWidth && styles.fullWidth, style]}>
      <TextInput
        style={[computedInputStyle, inputStyle]}
        editable={editable}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={computedPlaceholderColor}
        accessibilityState={{ disabled: !editable }}
        {...textInputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    alignSelf: 'stretch',
  },
});
