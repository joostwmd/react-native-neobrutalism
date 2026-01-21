import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, StyleProp } from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  Table as TanstackTable,
  OnChangeFn,
} from '@tanstack/react-table';

export interface DataTableProps<TData> {
  /** Column definitions for the table */
  columns: ColumnDef<TData, unknown>[];

  /** Data to display in the table */
  data: TData[];

  /** Enable row selection */
  enableRowSelection?: boolean;

  /** Enable sorting */
  enableSorting?: boolean;

  /** Enable column filters */
  enableFiltering?: boolean;

  /** Enable column visibility toggle */
  enableColumnVisibility?: boolean;

  /** Enable pagination */
  enablePagination?: boolean;

  /** Initial page size */
  pageSize?: number;

  /** Page size options */
  pageSizeOptions?: number[];

  /** Controlled sorting state */
  sorting?: SortingState;

  /** Sorting state callback */
  onSortingChange?: OnChangeFn<SortingState>;

  /** Controlled column filters state */
  columnFilters?: ColumnFiltersState;

  /** Column filters callback */
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;

  /** Controlled column visibility state */
  columnVisibility?: VisibilityState;

  /** Column visibility callback */
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;

  /** Controlled row selection state */
  rowSelection?: RowSelectionState;

  /** Row selection callback */
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  /** Override table container styles */
  style?: StyleProp<ViewStyle>;

  /** Override table shadow styles */
  shadowStyle?: StyleProp<ViewStyle> | null;

  /** Component-level theme overrides */
  themeOverride?: NeobrutalismThemeOverride;

  /** Render function for table toolbar */
  renderToolbar?: (table: TanstackTable<TData>) => ReactNode;

  /** Render function for empty state */
  renderEmpty?: () => ReactNode;

  /** Accessibility label */
  accessibilityLabel?: string;
}

export interface DataTablePaginationProps<TData> {
  /** The tanstack table instance */
  table: TanstackTable<TData>;

  /** Page size options */
  pageSizeOptions?: number[];

  /** Override container styles */
  style?: StyleProp<ViewStyle>;
}

export interface DataTableColumnHeaderProps {
  /** The column instance */
  column: {
    getIsSorted: () => false | 'asc' | 'desc';
    getCanSort: () => boolean;
    toggleSorting: (desc?: boolean) => void;
    getCanHide: () => boolean;
    toggleVisibility: (value: boolean) => void;
  };

  /** Header title */
  title: string;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text styles */
  textStyle?: StyleProp<TextStyle>;
}

export interface DataTableToolbarProps<TData> {
  /** The tanstack table instance */
  table: TanstackTable<TData>;

  /** Filter column ID */
  filterColumn?: string;

  /** Filter placeholder text */
  filterPlaceholder?: string;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;
}

export interface DataTableViewOptionsProps<TData> {
  /** The tanstack table instance */
  table: TanstackTable<TData>;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;
}
