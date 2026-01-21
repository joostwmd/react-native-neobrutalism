import { useMemo } from 'react';
import type { JSX } from 'react';
import { Modal, View, Pressable, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useDialogContext } from './DialogContext';
import type { DialogContentProps } from './Dialog.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Content container for the Dialog modal.
 *
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>...</DialogHeader>
 *   <DialogFooter>...</DialogFooter>
 * </DialogContent>
 * ```
 */
export function DialogContent({
  children,
  style,
  overlayStyle,
  shadowStyle,
  animationType = 'fade',
  closeOnBackdropPress = true,
  accessibilityLabel,
}: DialogContentProps): JSX.Element | null {
  const { open, setOpen, themeOverride } = useDialogContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Overlay styles
  const computedOverlayStyle: ViewStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    }),
    [theme.spacing]
  );

  // Content container styles
  const contentStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      padding: theme.spacing.lg,
      width: '100%',
      maxWidth: 425,
      gap: theme.spacing.md,
    }),
    [theme.colors.background, theme.border, theme.spacing]
  );

  // Shadow styles
  const computedShadowStyle: ViewStyle = useMemo(
    () => ({
      position: 'absolute',
      top: theme.shadow.offsetY,
      left: theme.shadow.offsetX,
      right: -theme.shadow.offsetX,
      bottom: -theme.shadow.offsetY,
      backgroundColor: theme.shadow.color,
      borderRadius: theme.border.radius,
    }),
    [theme.shadow, theme.border.radius]
  );

  // Determine if shadow should be shown
  const showShadow = shadowStyle !== null;

  // Handle backdrop press
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) setOpen(false);
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType={animationType}
      onRequestClose={() => setOpen(false)}
      accessibilityViewIsModal
      accessibilityLabel={accessibilityLabel}
    >
      <Pressable
        style={[computedOverlayStyle, overlayStyle]}
        onPress={handleBackdropPress}
      >
        <Pressable
          style={styles.contentWrapper}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Shadow layer */}
          {showShadow && <View style={[computedShadowStyle, shadowStyle]} />}

          {/* Content */}
          <View style={[contentStyle, style]}>{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: 425,
  },
});
