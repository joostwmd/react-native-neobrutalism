import { createContext, useContext } from 'react';
import type { DialogContextValue } from './Dialog.types';

/**
 * Context for sharing state between Dialog compound components.
 */
export const DialogContext = createContext<DialogContextValue | undefined>(
  undefined
);

/**
 * Hook to access Dialog context.
 * Throws an error if used outside of a Dialog component.
 *
 * @example
 * ```tsx
 * function DialogClose() {
 *   const { setOpen } = useDialogContext();
 *   return <Button onPress={() => setOpen(false)}>Close</Button>;
 * }
 * ```
 */
export function useDialogContext(): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(
      'Dialog compound components must be used within a <Dialog> component'
    );
  }
  return context;
}
