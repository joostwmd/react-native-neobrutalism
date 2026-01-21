import { createContext, useContext } from 'react';
import type { DropdownMenuContextValue } from './DropdownMenu.types';

/**
 * Context for sharing state between DropdownMenu compound components.
 */
export const DropdownMenuContext = createContext<
  DropdownMenuContextValue | undefined
>(undefined);

/**
 * Hook to access DropdownMenu context.
 * Throws an error if used outside of a DropdownMenu component.
 *
 * @example
 * ```tsx
 * function DropdownMenuItem() {
 *   const { open, setOpen } = useDropdownMenuContext();
 *   // ...
 * }
 * ```
 */
export function useDropdownMenuContext(): DropdownMenuContextValue {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      'DropdownMenu compound components must be used within a <DropdownMenu> component'
    );
  }
  return context;
}
