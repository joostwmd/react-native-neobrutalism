import { useState, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { PopoverContext } from './PopoverContext';
import type {
  PopoverProps,
  PopoverContextValue,
  TriggerLayout,
} from './Popover.types';

/**
 * Root component for the Popover.
 * Provides state management and context for child components.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>
 *     <Button>Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <Text>Popover content here</Text>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export function Popover({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  themeOverride,
}: PopoverProps): JSX.Element {
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
  const contextValue: PopoverContextValue = useMemo(
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
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}
