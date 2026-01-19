import { useState, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { ContextMenuContext } from './ContextMenuContext';
import type {
  ContextMenuProps,
  ContextMenuContextValue,
  TriggerLayout,
} from './ContextMenu.types';

/**
 * Root component for the Context Menu.
 * Provides state management and context for child components.
 * Opens on right-click (web) or long press (native).
 *
 * @example
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>
 *     <Text>Right-click me</Text>
 *   </ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem label="Copy" onPress={handleCopy} />
 *     <ContextMenuItem label="Paste" onPress={handlePaste} />
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
export function ContextMenu({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  themeOverride,
}: ContextMenuProps): JSX.Element {
  // Internal open state
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(
    null
  );
  const [pressPosition, setPressPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

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
  const contextValue: ContextMenuContextValue = useMemo(
    () => ({
      open,
      setOpen,
      triggerLayout,
      setTriggerLayout,
      pressPosition,
      setPressPosition,
      themeOverride,
    }),
    [open, setOpen, triggerLayout, pressPosition, themeOverride]
  );

  return (
    <ContextMenuContext.Provider value={contextValue}>
      {children}
    </ContextMenuContext.Provider>
  );
}
