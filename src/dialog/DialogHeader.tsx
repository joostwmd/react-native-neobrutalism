import { useMemo } from 'react';
import type { JSX } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { DialogHeaderProps } from './Dialog.types';

/**
 * Header section for the Dialog containing title and description.
 *
 * @example
 * ```tsx
 * <DialogHeader>
 *   <DialogTitle>Edit Profile</DialogTitle>
 *   <DialogDescription>Make changes to your profile here.</DialogDescription>
 * </DialogHeader>
 * ```
 */
export function DialogHeader({
  children,
  style,
}: DialogHeaderProps): JSX.Element {
  const headerStyle: ViewStyle = useMemo(
    () => ({
      gap: 8,
    }),
    []
  );

  return <View style={[headerStyle, style]}>{children}</View>;
}
