import React, { useCallback, useMemo } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useDialogContext } from './DialogContext';
import type { DialogCloseProps } from './Dialog.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Close button component that closes the Dialog when pressed.
 *
 * @example
 * ```tsx
 * // Default X button (positioned top-right)
 * <DialogClose />
 *
 * // Custom close button
 * <DialogClose asChild>
 *   <Button label="Cancel" variant="neutral" />
 * </DialogClose>
 * ```
 */
export function DialogClose({
  children,
  asChild = false,
  onPress,
  style,
}: DialogCloseProps): JSX.Element {
  const { setOpen, themeOverride } = useDialogContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  const handlePress = useCallback(() => {
    onPress?.();
    setOpen(false);
  }, [onPress, setOpen]);

  // Default close button styles - must be before any early returns
  const buttonStyle: ViewStyle = useMemo(
    () => ({
      position: 'absolute',
      top: -8,
      right: -8,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    [theme]
  );

  const iconStyle: TextStyle = useMemo(
    () => ({
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.foreground,
    }),
    [theme.colors.foreground]
  );

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

  // Default X icon button
  return (
    <Pressable
      onPress={handlePress}
      style={[buttonStyle, style]}
      accessibilityRole="button"
      accessibilityLabel="Close dialog"
    >
      {children ?? (
        <View>
          <Text style={iconStyle}>✕</Text>
        </View>
      )}
    </Pressable>
  );
}
