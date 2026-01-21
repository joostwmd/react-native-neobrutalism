import { useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Modal, View, Pressable, StyleSheet, Dimensions } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useDropdownMenuContext } from './DropdownMenuContext';
import type { DropdownMenuContentProps } from './DropdownMenu.types';
import type { NeobrutalismTheme } from '../theme/types';

const MENU_MIN_WIDTH = 160;
const MENU_PADDING = 8;

/**
 * Content container for the Dropdown Menu.
 * Displays below the trigger with primary color background.
 *
 * @example
 * ```tsx
 * <DropdownMenuContent>
 *   <DropdownMenuItem label="Edit" onPress={handleEdit} />
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem label="Delete" destructive onPress={handleDelete} />
 * </DropdownMenuContent>
 * ```
 */
export function DropdownMenuContent({
  children,
  style,
  overlayStyle,
  animationType = 'fade',
  align = 'start',
  sideOffset = 4,
  accessibilityLabel,
}: DropdownMenuContentProps): JSX.Element | null {
  const { open, setOpen, triggerLayout, themeOverride } =
    useDropdownMenuContext();
  const { theme: contextTheme } = useNeobrutalismTheme();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Calculate menu position based on trigger layout
  const menuPosition = useMemo(() => {
    if (!triggerLayout) return { top: 0, left: 0 };

    const { pageX, pageY, width, height } = triggerLayout;

    // Position below trigger
    let top = pageY + height + sideOffset;
    let left: number;

    // Calculate horizontal position based on alignment
    switch (align) {
      case 'end':
        left = pageX + width - MENU_MIN_WIDTH;
        break;
      case 'center':
        left = pageX + width / 2 - MENU_MIN_WIDTH / 2;
        break;
      case 'start':
      default:
        left = pageX;
        break;
    }

    // Ensure menu doesn't go off right edge
    if (left + MENU_MIN_WIDTH > windowWidth - MENU_PADDING)
      left = windowWidth - MENU_MIN_WIDTH - MENU_PADDING;

    // Ensure menu doesn't go off left edge
    if (left < MENU_PADDING) left = MENU_PADDING;

    // Ensure menu doesn't go off bottom (estimate ~200px menu height)
    const estimatedHeight = 200;
    if (top + estimatedHeight > windowHeight - MENU_PADDING)
      top = pageY - estimatedHeight - sideOffset;

    // Ensure menu doesn't go off top
    if (top < MENU_PADDING) top = MENU_PADDING;

    return { top, left };
  }, [triggerLayout, align, sideOffset, windowWidth, windowHeight]);

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

  if (!triggerLayout) return null;

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
