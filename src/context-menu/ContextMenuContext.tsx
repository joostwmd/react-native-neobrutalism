import { createContext, useContext } from 'react';
import type { ContextMenuContextValue } from './ContextMenu.types';

export const ContextMenuContext = createContext<ContextMenuContextValue | null>(
  null
);

export function useContextMenuContext(): ContextMenuContextValue {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error(
      'ContextMenu components must be used within a ContextMenu provider'
    );
  }
  return context;
}
