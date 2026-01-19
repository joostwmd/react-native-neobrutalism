import { useState, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { View } from 'react-native';
import { CollapsibleContext } from './CollapsibleContext';
import type {
  CollapsibleProps,
  CollapsibleContextValue,
} from './Collapsible.types';

/**
 * Root component for a collapsible panel.
 * Use with CollapsibleTrigger and CollapsibleContent.
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <Text>Hidden content here</Text>
 *   </CollapsibleContent>
 * </Collapsible>
 *
 * // Controlled
 * <Collapsible open={isOpen} onOpenChange={setIsOpen}>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <Text>Hidden content here</Text>
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
export function Collapsible({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  themeOverride,
  style,
}: CollapsibleProps): JSX.Element {
  // Internal state for uncontrolled mode
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  // Use controlled value if provided, otherwise use internal state
  const open = controlledOpen ?? internalOpen;

  // Handle open state changes
  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (disabled) return;
      setInternalOpen(newOpen);
      onOpenChange?.(newOpen);
    },
    [disabled, onOpenChange]
  );

  // Memoize context value
  const contextValue = useMemo<CollapsibleContextValue>(
    () => ({
      open,
      setOpen,
      disabled,
      themeOverride,
    }),
    [open, setOpen, disabled, themeOverride]
  );

  return (
    <CollapsibleContext.Provider value={contextValue}>
      <View style={style}>{children}</View>
    </CollapsibleContext.Provider>
  );
}
