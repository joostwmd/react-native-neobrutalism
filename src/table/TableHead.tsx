import { useMemo } from 'react';
import type { JSX } from 'react';
import { Pressable, View, Text } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useTableContext } from './TableContext';
import type { TableHeadProps } from './Table.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Table header cell component.
 * Supports sorting indicators and press handling.
 *
 * @example
 * ```tsx
 * <TableHead>Name</TableHead>
 *
 * // Sortable header
 * <TableHead
 *   sortable
 *   sortDirection={sortDir}
 *   onSort={handleSort}
 * >
 *   Email
 * </TableHead>
 * ```
 */
export function TableHead({
  children,
  style,
  textStyle,
  sortable = false,
  sortDirection = null,
  onSort,
  flex = 1,
  width,
  align = 'left',
}: TableHeadProps): JSX.Element {
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
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
      ...themeFontStyle(theme),
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.foreground,
    }),
    [theme.colors.foreground]
  );

  // Sort indicator
  const sortIndicator = sortable && sortDirection && (
    <Text
      style={{
        marginLeft: 4,
        color: theme.colors.foreground,
      }}
    >
      {sortDirection === 'asc' ? '↑' : '↓'}
    </Text>
  );

  const content = (
    <>
      {typeof children === 'string' ? (
        <Text style={[computedTextStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
      {sortIndicator}
    </>
  );

  if (sortable && onSort) {
    return (
      <Pressable
        onPress={onSort}
        style={[cellStyle, style]}
        accessibilityRole="button"
        accessibilityLabel={`Sort by ${typeof children === 'string' ? children : 'column'}`}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[cellStyle, style]}>{content}</View>;
}
