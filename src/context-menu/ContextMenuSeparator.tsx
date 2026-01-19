import { useMemo } from 'react';
import type { JSX } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useContextMenuContext } from './ContextMenuContext';
import type { ContextMenuSeparatorProps } from './ContextMenu.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Visual separator for Context Menu.
 * Creates a horizontal line between menu items.
 *
 * @example
 * ```tsx
 * <ContextMenuItem label="Copy" />
 * <ContextMenuSeparator />
 * <ContextMenuItem label="Delete" destructive />
 * ```
 */
export function ContextMenuSeparator({
  style,
}: ContextMenuSeparatorProps): JSX.Element {
  const { themeOverride } = useContextMenuContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Separator styles
  const separatorStyle: ViewStyle = useMemo(
    () => ({
      height: 1,
      backgroundColor: theme.colors.primaryForeground,
      opacity: 0.2,
      marginVertical: 4,
      marginHorizontal: 8,
    }),
    [theme.colors.primaryForeground]
  );

  return <View style={[separatorStyle, style]} accessibilityRole="separator" />;
}
