import { useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Modal, View, Pressable, StyleSheet, Dimensions } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useContextMenuContext } from './ContextMenuContext';
import type { ContextMenuContentProps } from './ContextMenu.types';
import type { NeobrutalismTheme } from '../theme/types';

const MENU_MIN_WIDTH = 160;
const MENU_PADDING = 8;

/**
 * Content container for the Context Menu.
 * Displays at the click/press position with primary color background.
 *
 * @example
 * ```tsx
 * <ContextMenuContent>
 *   <ContextMenuItem label="Copy" onPress={handleCopy} />
 *   <ContextMenuSeparator />
 *   <ContextMenuItem label="Delete" destructive onPress={handleDelete} />
 * </ContextMenuContent>
 * ```
 */
export function ContextMenuContent({
  children,
  style,
  overlayStyle,
  animationType = 'fade',
  accessibilityLabel,
}: ContextMenuContentProps): JSX.Element | null {
  const { open, setOpen, pressPosition, themeOverride } =
    useContextMenuContext();
  const { theme: contextTheme } = useNeobrutalismTheme();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Calculate menu position based on press/click location
  const menuPosition = useMemo(() => {
    if (!pressPosition) return { top: 0, left: 0 };

    let { x, y } = pressPosition;

    // Ensure menu doesn't go off right edge
    if (x + MENU_MIN_WIDTH > windowWidth - MENU_PADDING)
      x = windowWidth - MENU_MIN_WIDTH - MENU_PADDING;

    // Ensure menu doesn't go off left edge
    if (x < MENU_PADDING) x = MENU_PADDING;

    // Ensure menu doesn't go off bottom (estimate ~200px menu height)
    const estimatedHeight = 200;
    if (y + estimatedHeight > windowHeight - MENU_PADDING)
      y = y - estimatedHeight;

    // Ensure menu doesn't go off top
    if (y < MENU_PADDING) y = MENU_PADDING;

    return { top: y, left: x };
  }, [pressPosition, windowWidth, windowHeight]);

  // Overlay styles - semi-transparent to show context
  const computedOverlayStyle: ViewStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }),
    []
  );

  // Wrapper position styles
  const wrapperStyle: ViewStyle = useMemo(
    () => ({
      position: 'absolute',
      top: menuPosition.top,
      left: menuPosition.left,
      minWidth: MENU_MIN_WIDTH,
    }),
    [menuPosition]
  );

  // Shadow styles - positioned relative to wrapper
  const shadowStyle: ViewStyle = useMemo(
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

  // Content container styles - PRIMARY COLOR BACKGROUND
  const contentStyle: ViewStyle = useMemo(
    () => ({
      minWidth: MENU_MIN_WIDTH,
      backgroundColor: theme.colors.primary,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      padding: 4,
      overflow: 'hidden',
    }),
    [theme]
  );

  // Handle backdrop press
  const handleBackdropPress = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  if (!pressPosition) return null;

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
        <View style={styles.container}>
          <View style={wrapperStyle}>
            {/* Shadow layer */}
            <View style={shadowStyle} />

            {/* Content */}
            <Pressable
              style={[contentStyle, style]}
              onPress={(e) => e.stopPropagation()}
            >
              {children}
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
