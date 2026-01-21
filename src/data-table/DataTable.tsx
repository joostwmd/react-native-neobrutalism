import { useState, useMemo } from 'react';
import type { JSX } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import type {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  HeaderGroup,
  Header,
  Row,
  Cell,
} from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../table';
import { Checkbox } from '../checkbox';
import { DataTablePagination } from './DataTablePagination';
import type { DataTableProps } from './DataTable.types';

/**
 * DataTable component built on @tanstack/react-table.
 *
 * Provides sorting, filtering, pagination, row selection, and column visibility
 * with neobrutalism styling.
 *
 * @example
 * ```tsx
 * const columns: ColumnDef<Person>[] = [
 *   { accessorKey: 'name', header: 'Name' },
 *   { accessorKey: 'email', header: 'Email' },
 * ];
 *
 * <DataTable
 *   columns={columns}
 *   data={people}
 *   enableSorting
 *   enablePagination
 * />
 * ```
 */
export function DataTable<TData>({
  columns,
  data,
  enableRowSelection = false,
  enableSorting = false,
  enableFiltering = false,
  enableColumnVisibility: _enableColumnVisibility = false,
  enablePagination = false,
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  sorting: controlledSorting,
  onSortingChange,
  columnFilters: controlledColumnFilters,
  onColumnFiltersChange,
  columnVisibility: controlledColumnVisibility,
  onColumnVisibilityChange,
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  style,
  shadowStyle,
  themeOverride,
  renderToolbar,
  renderEmpty,
  accessibilityLabel = 'Data table',
}: DataTableProps<TData>): JSX.Element {
  // Internal state
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const [internalColumnFilters, setInternalColumnFilters] =
    useState<ColumnFiltersState>([]);
  const [internalColumnVisibility, setInternalColumnVisibility] =
    useState<VisibilityState>({});
  const [internalRowSelection, setInternalRowSelection] =
    useState<RowSelectionState>({});

  // Determine controlled vs uncontrolled state
  const sorting = controlledSorting ?? internalSorting;
  const columnFilters = controlledColumnFilters ?? internalColumnFilters;
  const columnVisibility =
    controlledColumnVisibility ?? internalColumnVisibility;
  const rowSelection = controlledRowSelection ?? internalRowSelection;

  // Prepare columns with selection column if enabled
  const tableColumns = useMemo(() => {
    if (!enableRowSelection) return columns;

    return [
      {
        id: 'select',
        header: ({
          table: headerTable,
        }: {
          table: ReturnType<typeof useReactTable<TData>>;
        }) => (
          <Checkbox
            checked={headerTable.getIsAllPageRowsSelected()}
            indeterminate={headerTable.getIsSomePageRowsSelected()}
            onCheckedChange={(value: boolean) =>
              headerTable.toggleAllPageRowsSelected(!!value)
            }
            accessibilityLabel="Select all rows"
          />
        ),
        cell: ({ row: cellRow }: { row: Row<TData> }) => (
          <Checkbox
            checked={cellRow.getIsSelected()}
            onCheckedChange={(value: boolean) =>
              cellRow.toggleSelected(!!value)
            }
            accessibilityLabel="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      ...columns,
    ];
  }, [columns, enableRowSelection]);

  // Create table instance
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection,
    onSortingChange: onSortingChange ?? setInternalSorting,
    onColumnFiltersChange: onColumnFiltersChange ?? setInternalColumnFilters,
    onColumnVisibilityChange:
      onColumnVisibilityChange ?? setInternalColumnVisibility,
    onRowSelectionChange: onRowSelectionChange ?? setInternalRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();

  return (
    <View style={styles.container}>
      {/* Custom toolbar */}
      {renderToolbar && renderToolbar(table)}

      {/* Table */}
      <Table
        style={style}
        shadowStyle={shadowStyle}
        themeOverride={themeOverride}
        accessibilityLabel={accessibilityLabel}
      >
        <TableHeader>
          {headerGroups.map((headerGroup: HeaderGroup<TData>) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: Header<TData, unknown>) => (
                <TableHead
                  key={header.id}
                  flex={header.column.columnDef.size ? undefined : 1}
                  width={header.column.columnDef.size}
                  sortable={enableSorting && header.column.getCanSort()}
                  sortDirection={header.column.getIsSorted() || null}
                  onSort={
                    enableSorting && header.column.getCanSort()
                      ? () => header.column.toggleSorting()
                      : undefined
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row: Row<TData>) => (
              <TableRow
                key={row.id}
                selected={row.getIsSelected()}
                onPress={
                  enableRowSelection ? () => row.toggleSelected() : undefined
                }
              >
                {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                  <TableCell
                    key={cell.id}
                    flex={cell.column.columnDef.size ? undefined : 1}
                    width={cell.column.columnDef.size}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell flex={1}>
                {renderEmpty ? (
                  renderEmpty()
                ) : (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No results.</Text>
                  </View>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {enablePagination && (
        <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
      )}

      {/* Selection count */}
      {enableRowSelection && Object.keys(rowSelection).length > 0 && (
        <View style={styles.selectionInfo}>
          <Text style={styles.selectionText}>
            {Object.keys(rowSelection).length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  emptyContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
  selectionInfo: {
    paddingVertical: 8,
  },
  selectionText: {
    fontSize: 14,
    color: '#666',
  },
});
