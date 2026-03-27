import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, Text } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useComboboxContext } from './ComboboxContext';
import type { ComboboxEmptyProps } from './Combobox.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Empty state component shown when no options match the search.
 *
 * @example
 * ```tsx
 * <ComboboxEmpty>No results found</ComboboxEmpty>
 *
 * // Custom content
 * <ComboboxEmpty>
 *   <View>
 *     <Text>Nothing here</Text>
 *     <Button label="Clear search" onPress={...} />
 *   </View>
 * </ComboboxEmpty>
 * ```
 */
export function ComboboxEmpty({
  children = 'No results found.',
  style,
  textStyle,
}: ComboboxEmptyProps): JSX.Element | null {
  const { options, searchValue, filterFn, themeOverride } =
    useComboboxContext();

  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Check if there are any matching options
  const hasResults = useMemo(() => {
    if (!searchValue) return options.length > 0;
    return options.some((option) => filterFn(option, searchValue));
  }, [options, searchValue, filterFn]);

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      padding: theme.spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [theme.spacing.lg]
  );

  // Text styles
  const computedTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 14,
      color: theme.colors.foreground,
      opacity: 0.6,
    }),
    [theme.colors.foreground]
  );

  // Only show if no results
  if (hasResults) return null;

  return (
    <View style={[containerStyle, style]}>
      {typeof children === 'string' ? (
        <Text style={[computedTextStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
