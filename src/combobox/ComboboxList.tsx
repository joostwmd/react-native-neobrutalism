import { useMemo } from 'react';
import type { JSX, ReactNode } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useComboboxContext } from './ComboboxContext';
import type { ComboboxListProps } from './Combobox.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Scrollable list container for Combobox items.
 *
 * @example
 * ```tsx
 * <ComboboxList>
 *   <ComboboxItem value="1" label="Option 1" />
 *   <ComboboxItem value="2" label="Option 2" />
 * </ComboboxList>
 * ```
 */
export function ComboboxList({
  children,
  style,
  emptyComponent,
  maxVisibleItems = 6,
}: ComboboxListProps & { children?: ReactNode }): JSX.Element {
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
      backgroundColor: theme.colors.background,
      maxHeight: maxVisibleItems * 44, // Approximate item height
    }),
    [theme.colors.background, maxVisibleItems]
  );

  // If no results and empty component provided, show it
  if (!hasResults && emptyComponent)
    return <View style={[containerStyle, style]}>{emptyComponent}</View>;

  return (
    <ScrollView
      style={[containerStyle, style]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});
