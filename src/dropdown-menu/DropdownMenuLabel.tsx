import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, Text } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useDropdownMenuContext } from './DropdownMenuContext';
import type { DropdownMenuLabelProps } from './DropdownMenu.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Section label for Dropdown Menu.
 * Displays a non-interactive label to group menu items.
 *
 * @example
 * ```tsx
 * <DropdownMenuContent>
 *   <DropdownMenuLabel>Actions</DropdownMenuLabel>
 *   <DropdownMenuItem label="Edit" onPress={handleEdit} />
 *   <DropdownMenuItem label="Delete" onPress={handleDelete} />
 * </DropdownMenuContent>
 * ```
 */
export function DropdownMenuLabel({
  children,
  style,
  textStyle,
}: DropdownMenuLabelProps): JSX.Element {
  const { themeOverride } = useDropdownMenuContext();
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

  // Label styles
  const labelStyle: TextStyle = useMemo(
    () => ({
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.primaryForeground,
      opacity: 0.7,
    }),
    [theme.colors.primaryForeground]
  );

  return (
    <View style={[containerStyle, style]}>
      {typeof children === 'string' ? (
        <Text style={[labelStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
