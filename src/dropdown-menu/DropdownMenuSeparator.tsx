import { useMemo } from 'react';
import type { JSX } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useDropdownMenuContext } from './DropdownMenuContext';
import type { DropdownMenuSeparatorProps } from './DropdownMenu.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Separator for Dropdown Menu.
 * Creates a horizontal divider between menu items.
 *
 * @example
 * ```tsx
 * <DropdownMenuContent>
 *   <DropdownMenuItem label="Edit" onPress={handleEdit} />
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem label="Delete" destructive onPress={handleDelete} />
 * </DropdownMenuContent>
 * ```
 */
export function DropdownMenuSeparator({
  style,
}: DropdownMenuSeparatorProps): JSX.Element {
  const { themeOverride } = useDropdownMenuContext();
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

  return <View style={[separatorStyle, style]} />;
}
