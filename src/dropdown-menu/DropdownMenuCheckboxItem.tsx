import { useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useDropdownMenuContext } from './DropdownMenuContext';
import type { DropdownMenuCheckboxItemProps } from './DropdownMenu.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Checkbox item for Dropdown Menu.
 * Displays a toggleable checkbox item.
 *
 * @example
 * ```tsx
 * <DropdownMenuCheckboxItem
 *   label="Show notifications"
 *   checked={showNotifications}
 *   onCheckedChange={setShowNotifications}
 * />
 * ```
 */
export function DropdownMenuCheckboxItem({
  label,
  children,
  checked = false,
  onCheckedChange,
  disabled = false,
  shortcut,
  style,
  textStyle,
}: DropdownMenuCheckboxItemProps): JSX.Element {
  const { themeOverride } = useDropdownMenuContext();
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

  // Container styles
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

  // Hover/Pressed state style
  const highlightStyle: ViewStyle = useMemo(
    () => ({
      borderColor: theme.colors.primaryForeground,
    }),
    [theme.colors.primaryForeground]
  );

  // Checkbox indicator styles
  const checkboxStyle: ViewStyle = useMemo(
    () => ({
      width: 16,
      height: 16,
      borderWidth: 2,
      borderColor: theme.colors.primaryForeground,
      borderRadius: 3,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: checked ? theme.colors.primaryForeground : 'transparent',
    }),
    [theme.colors.primaryForeground, checked]
  );

  // Label styles
  const labelStyle: TextStyle = useMemo(
    () => ({
      flex: 1,
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.primaryForeground,
    }),
    [theme.colors.primaryForeground]
  );

  // Shortcut styles
  const shortcutTextStyle: TextStyle = useMemo(
    () => ({
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
      <View style={checkboxStyle}>
        {checked && (
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: 10,
              fontWeight: '700',
            }}
          >
            ✓
          </Text>
        )}
      </View>
      {children ? (
        children
      ) : (
        <Text style={[labelStyle, textStyle]}>{label}</Text>
      )}
      {shortcut && <Text style={shortcutTextStyle}>{shortcut}</Text>}
    </Pressable>
  );
}
