import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useComboboxContext } from './ComboboxContext';
import { XIcon } from '../icons/XIcon';
import type { ComboboxInputProps } from './Combobox.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Search input for filtering Combobox options.
 *
 * @example
 * ```tsx
 * <ComboboxInput />
 *
 * // Custom placeholder
 * <ComboboxInput placeholder="Type to search..." />
 *
 * // Hide clear button
 * <ComboboxInput showClear={false} />
 * ```
 */
export function ComboboxInput({
  style,
  inputStyle,
  clearIcon,
  showClear = true,
  placeholder,
}: ComboboxInputProps): JSX.Element | null {
  const {
    searchValue,
    setSearchValue,
    searchPlaceholder,
    searchable,
    themeOverride,
  } = useComboboxContext();

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
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.sm,
      borderBottomWidth: theme.border.width,
      borderBottomColor: theme.border.color,
      backgroundColor: theme.colors.background,
    }),
    [theme]
  );

  // Input styles
  const computedInputStyle: TextStyle = useMemo(
    () => ({
      flex: 1,
      fontSize: 16,
      color: theme.colors.foreground,
      padding: theme.spacing.xs,
    }),
    [theme]
  );

  // Don't render if not searchable
  if (!searchable) return null;

  return (
    <View style={[containerStyle, style]}>
      <TextInput
        value={searchValue}
        onChangeText={setSearchValue}
        placeholder={placeholder ?? searchPlaceholder}
        placeholderTextColor={`${theme.colors.foreground}80`}
        style={[computedInputStyle, inputStyle]}
        autoFocus
        autoCapitalize="none"
        autoCorrect={false}
      />
      {showClear && searchValue.length > 0 && (
        <Pressable
          onPress={() => setSearchValue('')}
          style={styles.clearButton}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
        >
          {clearIcon ?? <XIcon size={16} color={theme.colors.foreground} />}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    padding: 4,
  },
});
