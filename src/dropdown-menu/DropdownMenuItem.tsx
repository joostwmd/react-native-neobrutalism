import { useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useDropdownMenuContext } from './DropdownMenuContext';
import type { DropdownMenuItemProps } from './DropdownMenu.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Menu item for Dropdown Menu.
 * Displays an action with optional icon and keyboard shortcut.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem
 *   label="Edit"
 *   icon={<EditIcon />}
 *   shortcut="⌘E"
 *   onPress={handleEdit}
 * />
 * ```
 */
export function DropdownMenuItem({
  label,
  children,
  onPress,
  disabled = false,
  icon,
  shortcut,
  style,
  textStyle,
  shortcutStyle,
  destructive = false,
}: DropdownMenuItemProps): JSX.Element {
  const { setOpen, themeOverride } = useDropdownMenuContext();
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
    onPress?.();
    setOpen(false);
  }, [disabled, onPress, setOpen]);

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

  // Text color
  const textColor = destructive ? '#EF4444' : theme.colors.primaryForeground;

  // Label styles
  const labelStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      flex: 1,
      fontSize: 14,
      fontWeight: '500',
      color: textColor,
    }),
    [textColor]
  );

  // Shortcut styles
  const shortcutTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 12,
      color: textColor,
      opacity: 0.7,
      marginLeft: 16,
    }),
    [textColor]
  );

  // Icon styles
  const iconStyle: ViewStyle = useMemo(
    () => ({
      marginRight: 8,
    }),
    []
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
      accessibilityRole="menuitem"
      accessibilityState={{ disabled }}
      accessibilityLabel={label}
    >
      {icon && <View style={iconStyle}>{icon}</View>}
      {children ? (
        children
      ) : (
        <Text style={[labelStyle, textStyle]}>{label}</Text>
      )}
      {shortcut && (
        <Text style={[shortcutTextStyle, shortcutStyle]}>{shortcut}</Text>
      )}
    </Pressable>
  );
}
