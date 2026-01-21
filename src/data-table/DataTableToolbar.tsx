import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Input } from '../input';
import { Button } from '../buttons';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import type { DataTableToolbarProps } from './DataTable.types';

/**
 * Toolbar component for DataTable with filtering.
 *
 * @example
 * ```tsx
 * <DataTableToolbar
 *   table={table}
 *   filterColumn="email"
 *   filterPlaceholder="Filter emails..."
 * />
 * ```
 */
export function DataTableToolbar<TData>({
  table,
  filterColumn,
  filterPlaceholder = 'Filter...',
  style,
}: DataTableToolbarProps<TData>): JSX.Element {
  const { theme } = useNeobrutalismTheme();

  const column = filterColumn ? table.getColumn(filterColumn) : null;
  const rawFilterValue = column?.getFilterValue();
  const filterValue = typeof rawFilterValue === 'string' ? rawFilterValue : '';

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.md,
    }),
    [theme.spacing]
  );

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <View style={[containerStyle, style]}>
      {filterColumn && column && (
        <Input
          placeholder={filterPlaceholder}
          value={filterValue}
          onChangeText={(value) => column.setFilterValue(value)}
          style={styles.filterInput}
        />
      )}
      {isFiltered && (
        <Button
          variant="secondary"
          size="small"
          label="Reset"
          onPress={() => table.resetColumnFilters()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filterInput: {
    maxWidth: 250,
  },
});
