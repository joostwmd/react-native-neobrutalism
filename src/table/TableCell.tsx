import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, Text } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useTableContext } from './TableContext';
import type { TableCellProps } from './Table.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Table data cell component.
 *
 * @example
 * ```tsx
 * <TableCell>John Doe</TableCell>
 *
 * // With custom alignment
 * <TableCell align="right">$100.00</TableCell>
 *
 * // With custom content
 * <TableCell>
 *   <Badge>Active</Badge>
 * </TableCell>
 * ```
 */
export function TableCell({
  children,
  style,
  textStyle,
  flex = 1,
  width,
  align = 'left',
}: TableCellProps): JSX.Element {
  const { themeOverride } = useTableContext();
  const { theme: contextTheme } = useNeobrutalismTheme();
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Cell container styles
  const cellStyle: ViewStyle = useMemo(
    () => ({
      flex: width ? undefined : flex,
      width,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      justifyContent: 'center',
      alignItems:
        align === 'center'
          ? 'center'
          : align === 'right'
            ? 'flex-end'
            : 'flex-start',
    }),
    [flex, width, theme.spacing, align]
  );

  // Text styles
  const computedTextStyle: TextStyle = useMemo(
    () => ({
      fontSize: 14,
      color: theme.colors.foreground,
    }),
    [theme.colors.foreground]
  );

  return (
    <View style={[cellStyle, style]}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={[computedTextStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
