import { createContext, useContext } from 'react';
import type { CollapsibleContextValue } from './Collapsible.types';

/**
 * Context for sharing state between Collapsible compound components.
 */
export const CollapsibleContext = createContext<
  CollapsibleContextValue | undefined
>(undefined);

/**
 * Hook to access Collapsible context.
 * Throws an error if used outside of a Collapsible component.
 *
 * @example
 * ```tsx
 * function CollapsibleTrigger() {
 *   const { open, setOpen } = useCollapsibleContext();
 *   return <Pressable onPress={() => setOpen(!open)}>...</Pressable>;
 * }
 * ```
 */
export function useCollapsibleContext(): CollapsibleContextValue {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      'Collapsible compound components must be used within a <Collapsible> component'
    );
  }
  return context;
}
