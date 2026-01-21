import type { JSX } from 'react';
import type { Column } from '@tanstack/react-table';
import { Button } from '../buttons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '../dropdown-menu';
import type { DataTableViewOptionsProps } from './DataTable.types';

/**
 * Column visibility toggle for DataTable.
 *
 * @example
 * ```tsx
 * <DataTableViewOptions table={table} />
 * ```
 */
export function DataTableViewOptions<TData>({
  table,
  style,
}: DataTableViewOptionsProps<TData>): JSX.Element {
  const allColumns = table
    .getAllColumns()
    .filter(
      (column: Column<TData, unknown>) =>
        typeof column.accessorFn !== 'undefined' && column.getCanHide()
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger style={style}>
        <Button variant="secondary" size="small" label="Columns" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {allColumns.map((column: Column<TData, unknown>) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            label={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
