import { useRef, useCallback, cloneElement, isValidElement } from 'react';
import type { JSX, ReactElement } from 'react';
import { Pressable } from 'react-native';
import { usePopoverContext } from './PopoverContext';
import type { PopoverTriggerProps } from './Popover.types';

/**
 * Trigger for the Popover.
 * Opens the popover on press.
 *
 * @example
 * ```tsx
 * <PopoverTrigger>
 *   <Button>Open Popover</Button>
 * </PopoverTrigger>
 *
 * // Or with asChild to merge props
 * <PopoverTrigger asChild>
 *   <CustomButton />
 * </PopoverTrigger>
 * ```
 */
export function PopoverTrigger({
  children,
  asChild = false,
  style,
  disabled = false,
  accessibilityLabel,
}: PopoverTriggerProps): JSX.Element {
  const { open, setOpen, setTriggerLayout } = usePopoverContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const triggerRef = useRef<any>(null);

  // Handle press
  const handlePress = useCallback(() => {
    if (disabled) return;

    // Measure trigger for positioning
    triggerRef.current?.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        setTriggerLayout({ x, y, width, height, pageX, pageY });
        setOpen(!open);
      }
    );
  }, [disabled, open, setOpen, setTriggerLayout]);

  // If asChild, clone the child element and merge props
  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<{ onPress?: () => void }>, {
      onPress: handlePress,
    });
  }

  return (
    <Pressable
      ref={triggerRef}
      onPress={handlePress}
      disabled={disabled}
      style={style}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || 'Open popover'}
      accessibilityState={{ disabled, expanded: open }}
    >
      {children}
    </Pressable>
  );
}
