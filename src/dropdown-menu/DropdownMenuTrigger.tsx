import { useRef, useCallback, cloneElement, isValidElement } from 'react';
import type { JSX, ReactElement } from 'react';
import { Pressable } from 'react-native';
import { useDropdownMenuContext } from './DropdownMenuContext';
import type { DropdownMenuTriggerProps } from './DropdownMenu.types';

/**
 * Trigger for the Dropdown Menu.
 * Opens the menu on press.
 *
 * @example
 * ```tsx
 * <DropdownMenuTrigger>
 *   <Button>Open Menu</Button>
 * </DropdownMenuTrigger>
 *
 * // Or with asChild
 * <DropdownMenuTrigger asChild>
 *   <CustomButton />
 * </DropdownMenuTrigger>
 * ```
 */
export function DropdownMenuTrigger({
  children,
  asChild = false,
  style,
  disabled = false,
  accessibilityLabel,
}: DropdownMenuTriggerProps): JSX.Element {
  const { open, setOpen, setTriggerLayout } = useDropdownMenuContext();
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
      accessibilityLabel={accessibilityLabel || 'Open dropdown menu'}
      accessibilityState={{ disabled, expanded: open }}
    >
      {children}
    </Pressable>
  );
}
