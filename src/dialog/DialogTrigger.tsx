import React, { useCallback } from 'react';
import type { JSX } from 'react';
import { Pressable } from 'react-native';
import { useDialogContext } from './DialogContext';
import type { DialogTriggerProps } from './Dialog.types';

/**
 * Trigger component that opens the Dialog when pressed.
 *
 * @example
 * ```tsx
 * // Wraps child in Pressable
 * <DialogTrigger>
 *   <Text>Open Dialog</Text>
 * </DialogTrigger>
 *
 * // Or use asChild to merge onPress into child
 * <DialogTrigger asChild>
 *   <Button label="Open" />
 * </DialogTrigger>
 * ```
 */
export function DialogTrigger({
  children,
  asChild = false,
}: DialogTriggerProps): JSX.Element {
  const { setOpen } = useDialogContext();

  const handlePress = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  // If asChild, clone the child and merge onPress
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onPress?: () => void;
    }>;

    return React.cloneElement(child, {
      onPress: () => {
        child.props.onPress?.();
        handlePress();
      },
    });
  }

  return (
    <Pressable onPress={handlePress} accessibilityRole="button">
      {children}
    </Pressable>
  );
}
