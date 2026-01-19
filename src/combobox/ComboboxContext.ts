import { createContext, useContext } from 'react';
import type { ComboboxContextValue } from './Combobox.types';

/**
 * Context for sharing state between Combobox compound components.
 */
export const ComboboxContext = createContext<ComboboxContextValue | undefined>(
  undefined
);

/**
 * Hook to access Combobox context.
 * Throws an error if used outside of a Combobox component.
 *
 * @example
 * ```tsx
 * function ComboboxItem({ value }) {
 *   const { isSelected, toggleValue } = useComboboxContext();
 *   return (
 *     <Pressable onPress={() => toggleValue(value)}>
 *       {isSelected(value) && <CheckIcon />}
 *     </Pressable>
 *   );
 * }
 * ```
 */
export function useComboboxContext(): ComboboxContextValue {
  const context = useContext(ComboboxContext);
  if (!context) {
    throw new Error(
      'Combobox compound components must be used within a <Combobox> component'
    );
  }
  return context;
}
