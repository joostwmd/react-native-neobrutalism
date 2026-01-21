import { useMemo } from 'react';
import type { JSX } from 'react';
import { Pressable, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useTableContext } from './TableContext';
import type { TableRowProps } from './Table.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Table row component.
 *
 * @example
 * ```tsx
 * <TableRow>
 *   <TableCell>Cell 1</TableCell>
 *   <TableCell>Cell 2</TableCell>
 * </TableRow>
 *
 * // Selectable row
 * <TableRow selected={isSelected} onPress={handleSelect}>
 *   <TableCell>Cell 1</TableCell>
 * </TableRow>
 * ```
 */
export function TableRow({
  children,
  style,
  selected = false,
  onPress,
}: TableRowProps): JSX.Element {
  const { themeOverride } = useTableContext();
  const { theme: contextTheme } = useNeobrutalismTheme();
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Row container styles
  const rowStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.border.color,
      backgroundColor: selected ? theme.colors.secondary : 'transparent',
    }),
    [theme, selected]
  );

  // Hover/pressed styles
  const highlightStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.secondary,
    }),
    [theme.colors.secondary]
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({
          pressed,
          hovered,
        }: {
          pressed: boolean;
          hovered?: boolean;
        }) => [
          rowStyle,
          !selected && (hovered || pressed) && highlightStyle,
          style,
        ]}
        accessibilityRole="button"
        accessibilityState={{ selected }}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[rowStyle, style]}>{children}</View>;
}
