import { useState, useCallback, useMemo } from 'react';
import type { JSX } from 'react';
import { DialogContext } from './DialogContext';
import type { DialogProps, DialogContextValue } from './Dialog.types';

/**
 * Neobrutalism styled dialog component for displaying content in a modal overlay.
 *
 * Unlike AlertDialog, Dialog can be dismissed by clicking the backdrop
 * and is suitable for general-purpose modal content.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>
 *     <Button label="Open Dialog" />
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Edit Profile</DialogTitle>
 *       <DialogDescription>Make changes to your profile here.</DialogDescription>
 *     </DialogHeader>
 *     <Input placeholder="Name" />
 *     <DialogFooter>
 *       <DialogClose asChild>
 *         <Button label="Cancel" variant="neutral" />
 *       </DialogClose>
 *       <Button label="Save" onPress={handleSave} />
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export function Dialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  themeOverride,
}: DialogProps): JSX.Element {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  // Use controlled or uncontrolled state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (newOpen: boolean) => {
      setInternalOpen(newOpen);
      onOpenChange?.(newOpen);
    },
    [onOpenChange]
  );

  const contextValue = useMemo<DialogContextValue>(
    () => ({ open, setOpen, themeOverride }),
    [open, setOpen, themeOverride]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
}
