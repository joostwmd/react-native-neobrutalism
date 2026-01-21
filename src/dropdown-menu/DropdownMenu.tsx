import { useState, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { DropdownMenuContext } from './DropdownMenuContext';
import type {
  DropdownMenuProps,
  DropdownMenuContextValue,
  TriggerLayout,
} from './DropdownMenu.types';

/**
 * Root component for the Dropdown Menu.
 * Provides state management and context for child components.
 * Opens on press (unlike ContextMenu which opens on long press).
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>
 *     <Button>Open Menu</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem label="Edit" onPress={handleEdit} />
 *     <DropdownMenuItem label="Delete" onPress={handleDelete} />
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export function DropdownMenu({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  themeOverride,
}: DropdownMenuProps): JSX.Element {
  // Internal open state
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(
    null
  );

  // Determine if controlled or uncontrolled
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  // Handle open state changes
  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) setInternalOpen(newOpen);

      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  // Context value
  const contextValue: DropdownMenuContextValue = useMemo(
    () => ({
      open,
      setOpen,
      triggerLayout,
      setTriggerLayout,
      themeOverride,
    }),
    [open, setOpen, triggerLayout, themeOverride]
  );

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      {children}
    </DropdownMenuContext.Provider>
  );
}
