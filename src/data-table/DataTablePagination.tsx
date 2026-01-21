import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Button } from '../buttons';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import type { DataTablePaginationProps } from './DataTable.types';

/**
 * Pagination controls for DataTable.
 *
 * @example
 * ```tsx
 * <DataTablePagination
 *   table={table}
 *   pageSizeOptions={[10, 20, 50]}
 * />
 * ```
 */
export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  style,
}: DataTablePaginationProps<TData>): JSX.Element {
  const { theme } = useNeobrutalismTheme();

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.md,
    }),
    [theme.spacing]
  );

  return (
    <View style={[containerStyle, style]}>
      {/* Page size selector */}
      <View style={styles.pageSizeContainer}>
        <Text style={styles.label}>Rows per page:</Text>
        <View style={styles.pageSizeButtons}>
          {pageSizeOptions.map((size) => (
            <Button
              key={size}
              variant={pageSize === size ? 'primary' : 'secondary'}
              size="small"
              label={String(size)}
              onPress={() => table.setPageSize(size)}
              style={styles.pageSizeButton}
            />
          ))}
        </View>
      </View>

      {/* Page info */}
      <Text style={styles.pageInfo}>
        Page {pageIndex + 1} of {pageCount || 1}
      </Text>

      {/* Navigation buttons */}
      <View style={styles.navButtons}>
        <Button
          variant="secondary"
          size="small"
          label="<<"
          onPress={() => table.setPageIndex(0)}
          disabled={!canPreviousPage}
        />
        <Button
          variant="secondary"
          size="small"
          label="<"
          onPress={() => table.previousPage()}
          disabled={!canPreviousPage}
        />
        <Button
          variant="secondary"
          size="small"
          label=">"
          onPress={() => table.nextPage()}
          disabled={!canNextPage}
        />
        <Button
          variant="secondary"
          size="small"
          label=">>"
          onPress={() => table.setPageIndex(pageCount - 1)}
          disabled={!canNextPage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  pageSizeButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  pageSizeButton: {
    minWidth: 40,
  },
  pageInfo: {
    fontSize: 14,
    fontWeight: '500',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 4,
  },
});
