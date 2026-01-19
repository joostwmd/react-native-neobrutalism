import { useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useContextMenuContext } from './ContextMenuContext';
import type { ContextMenuItemProps } from './ContextMenu.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Menu item for Context Menu.
 * Displays an action with optional icon and keyboard shortcut.
 *
 * @example
 * ```tsx
 * <ContextMenuItem
 *   label="Copy"
 *   icon={<CopyIcon />}
 *   shortcut="⌘C"
 *   onPress={handleCopy}
 * />
 * ```
 */
export function ContextMenuItem({
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
}: ContextMenuItemProps): JSX.Element {
  const { setOpen, themeOverride } = useContextMenuContext();
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

  // Text color - primaryForeground, or destructive red
  const textColor = destructive ? '#EF4444' : theme.colors.primaryForeground;

  // Label styles
  const labelStyle: TextStyle = useMemo(
    () => ({
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
