import { useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useContextMenuContext } from './ContextMenuContext';
import type { ContextMenuCheckboxItemProps } from './ContextMenu.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Checkbox menu item for Context Menu.
 * Toggles a checked state with visual indicator.
 *
 * @example
 * ```tsx
 * <ContextMenuCheckboxItem
 *   label="Show Grid"
 *   checked={showGrid}
 *   onCheckedChange={setShowGrid}
 * />
 * ```
 */
export function ContextMenuCheckboxItem({
  label,
  children,
  checked = false,
  onCheckedChange,
  disabled = false,
  shortcut,
  style,
  textStyle,
}: ContextMenuCheckboxItemProps): JSX.Element {
  const { themeOverride } = useContextMenuContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Handle press
  const handlePress = useCallback(() => {
    if (disabled) return;
    onCheckedChange?.(!checked);
  }, [disabled, checked, onCheckedChange]);

  // Container styles - includes transparent border to prevent layout shift on hover
  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: theme.border.radius - 2,
      borderWidth: 2,
      borderColor: 'transparent',
      opacity: disabled ? 0.5 : 1,
    }),
    [theme.border.radius, disabled]
  );

  // Hover/Pressed state style - border highlight
  const highlightStyle: ViewStyle = useMemo(
    () => ({
      borderColor: theme.colors.primaryForeground,
    }),
    [theme.colors.primaryForeground]
  );

  // Checkbox indicator styles
  const indicatorStyle: ViewStyle = useMemo(
    () => ({
      width: 16,
      height: 16,
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    []
  );

  // Checkmark text
  const checkmarkStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 12,
      fontWeight: '700',
      color: theme.colors.primaryForeground,
    }),
    [theme.colors.primaryForeground]
  );

  // Label styles
  const labelStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      flex: 1,
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.primaryForeground,
    }),
    [theme.colors.primaryForeground]
  );

  // Shortcut styles
  const shortcutStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 12,
      color: theme.colors.primaryForeground,
      opacity: 0.7,
      marginLeft: 16,
    }),
    [theme.colors.primaryForeground]
  );

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({
        pressed,
        hovered,
      }: {
        pressed: boolean;
        hovered?: boolean;
      }) => [
        containerStyle,
        !disabled && (hovered || pressed) && highlightStyle,
        style,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
    >
      <View style={indicatorStyle}>
        {checked && <Text style={checkmarkStyle}>✓</Text>}
      </View>
      {children ? (
        children
      ) : (
        <Text style={[labelStyle, textStyle]}>{label}</Text>
      )}
      {shortcut && <Text style={shortcutStyle}>{shortcut}</Text>}
    </Pressable>
  );
}
