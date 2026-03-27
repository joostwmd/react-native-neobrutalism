import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, Text } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useComboboxContext } from './ComboboxContext';
import type { ComboboxGroupProps } from './Combobox.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Group container for organizing Combobox items.
 *
 * @example
 * ```tsx
 * <ComboboxList>
 *   <ComboboxGroup label="Fruits">
 *     <ComboboxItem value="apple" label="Apple" />
 *     <ComboboxItem value="banana" label="Banana" />
 *   </ComboboxGroup>
 *   <ComboboxGroup label="Vegetables">
 *     <ComboboxItem value="carrot" label="Carrot" />
 *     <ComboboxItem value="broccoli" label="Broccoli" />
 *   </ComboboxGroup>
 * </ComboboxList>
 * ```
 */
export function ComboboxGroup({
  label,
  children,
  style,
  labelStyle,
}: ComboboxGroupProps): JSX.Element {
  const { themeOverride } = useComboboxContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      paddingTop: theme.spacing.sm,
    }),
    [theme.spacing.sm]
  );

  // Label styles
  const computedLabelStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.foreground,
      opacity: 0.6,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    }),
    [theme]
  );

  return (
    <View style={[containerStyle, style]}>
      <Text style={[computedLabelStyle, labelStyle]}>{label}</Text>
      {children}
    </View>
  );
}
