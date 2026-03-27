import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, Text } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useContextMenuContext } from './ContextMenuContext';
import type { ContextMenuLabelProps } from './ContextMenu.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Non-interactive label for Context Menu.
 * Used for section headers or descriptive text.
 *
 * @example
 * ```tsx
 * <ContextMenuLabel>Actions</ContextMenuLabel>
 * <ContextMenuItem label="Copy" />
 * <ContextMenuItem label="Paste" />
 * ```
 */
export function ContextMenuLabel({
  children,
  style,
  textStyle,
}: ContextMenuLabelProps): JSX.Element {
  const { themeOverride } = useContextMenuContext();
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
      paddingHorizontal: 12,
      paddingVertical: 6,
    }),
    []
  );

  // Text styles
  const labelStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.primaryForeground,
      opacity: 0.7,
    }),
    [theme.colors.primaryForeground]
  );

  return (
    <View style={[containerStyle, style]} accessibilityRole="header">
      {typeof children === 'string' ? (
        <Text style={[labelStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
