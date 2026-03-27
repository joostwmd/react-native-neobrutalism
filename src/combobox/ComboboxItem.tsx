import { useEffect, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useComboboxContext } from './ComboboxContext';
import { CheckIcon } from '../icons/CheckIcon';
import type { ComboboxItemProps } from './Combobox.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Individual selectable item in the Combobox list.
 *
 * @example
 * ```tsx
 * <ComboboxItem value="apple" label="Apple" />
 *
 * // With icon
 * <ComboboxItem value="settings" label="Settings" icon={<GearIcon />} />
 *
 * // Disabled
 * <ComboboxItem value="unavailable" label="Unavailable" disabled />
 *
 * // Custom content
 * <ComboboxItem value="user">
 *   <View style={{ flexDirection: 'row' }}>
 *     <Avatar />
 *     <Text>John Doe</Text>
 *   </View>
 * </ComboboxItem>
 * ```
 */
export function ComboboxItem({
  value,
  label,
  children,
  disabled = false,
  icon,
  style,
  textStyle,
}: ComboboxItemProps): JSX.Element | null {
  const {
    isSelected,
    toggleValue,
    registerOption,
    unregisterOption,
    searchValue,
    filterFn,
    themeOverride,
  } = useComboboxContext();

  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  const selected = isSelected(value);
  const displayLabel = label ?? value;

  // Register option on mount
  useEffect(() => {
    registerOption({ value, label: displayLabel, disabled, icon });
    return () => unregisterOption(value);
  }, [value, displayLabel, disabled, icon, registerOption, unregisterOption]);

  // Check if item matches search filter
  const matchesFilter = useMemo(() => {
    if (!searchValue) return true;
    return filterFn(
      { value, label: displayLabel, disabled, icon },
      searchValue
    );
  }, [searchValue, filterFn, value, displayLabel, disabled, icon]);

  // Handle press
  const handlePress = useCallback(() => {
    if (!disabled) toggleValue(value);
  }, [disabled, toggleValue, value]);

  // Item container styles
  const itemStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.md,
      backgroundColor: selected
        ? theme.colors.primary + '20' // 20% opacity
        : theme.colors.background,
      opacity: disabled ? 0.5 : 1,
    }),
    [theme, selected, disabled]
  );

  // Text styles
  const computedTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      flex: 1,
      fontSize: 16,
      color: theme.colors.foreground,
      fontWeight: selected ? '600' : '400',
    }),
    [theme.colors.foreground, selected]
  );

  // Don't render if doesn't match filter
  if (!matchesFilter) return null;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="option"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={displayLabel}
      style={[itemStyle, style]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}

      {children ?? (
        <Text style={[computedTextStyle, textStyle]}>{displayLabel}</Text>
      )}

      {selected && <CheckIcon size={16} color={theme.colors.foreground} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 12,
  },
});
