import { useMemo } from 'react';
import type { JSX } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { DialogFooterProps } from './Dialog.types';

/**
 * Footer section for the Dialog containing action buttons.
 *
 * @example
 * ```tsx
 * <DialogFooter>
 *   <DialogClose asChild>
 *     <Button label="Cancel" variant="neutral" />
 *   </DialogClose>
 *   <Button label="Save" onPress={handleSave} />
 * </DialogFooter>
 * ```
 */
export function DialogFooter({
  children,
  style,
}: DialogFooterProps): JSX.Element {
  const footerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
      marginTop: 8,
    }),
    []
  );

  return <View style={[footerStyle, style]}>{children}</View>;
}
