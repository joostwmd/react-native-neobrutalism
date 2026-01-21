import { useMemo } from 'react';
import type { JSX } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useTableContext } from './TableContext';
import type { TableHeaderProps } from './Table.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Table header section containing header rows.
 *
 * @example
 * ```tsx
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Column 1</TableHead>
 *     <TableHead>Column 2</TableHead>
 *   </TableRow>
 * </TableHeader>
 * ```
 */
export function TableHeader({
  children,
  style,
}: TableHeaderProps): JSX.Element {
  const { themeOverride } = useTableContext();
  const { theme: contextTheme } = useNeobrutalismTheme();
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Header container styles
  const headerStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.secondary,
      borderBottomWidth: theme.border.width,
      borderBottomColor: theme.border.color,
    }),
    [theme]
  );

  return <View style={[headerStyle, style]}>{children}</View>;
}
