import { createContext, useContext } from 'react';
import type { TableContextValue } from './Table.types';

/**
 * Context for sharing state between Table compound components.
 */
export const TableContext = createContext<TableContextValue | undefined>(
  undefined
);

/**
 * Hook to access Table context.
 * Throws an error if used outside of a Table component.
 *
 * @example
 * ```tsx
 * function TableCell() {
 *   const { themeOverride } = useTableContext();
 *   // ...
 * }
 * ```
 */
export function useTableContext(): TableContextValue {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error(
      'Table compound components must be used within a <Table> component'
    );
  }
  return context;
}
