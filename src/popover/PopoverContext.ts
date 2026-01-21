import { createContext, useContext } from 'react';
import type { PopoverContextValue } from './Popover.types';

/**
 * Context for sharing state between Popover compound components.
 */
export const PopoverContext = createContext<PopoverContextValue | undefined>(
  undefined
);

/**
 * Hook to access Popover context.
 * Throws an error if used outside of a Popover component.
 *
 * @example
 * ```tsx
 * function PopoverContent() {
 *   const { open, setOpen } = usePopoverContext();
 *   return open ? <View>Content</View> : null;
 * }
 * ```
 */
export function usePopoverContext(): PopoverContextValue {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error(
      'Popover compound components must be used within a <Popover> component'
    );
  }
  return context;
}
