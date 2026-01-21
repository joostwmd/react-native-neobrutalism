import { useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Modal, View, Pressable, StyleSheet, Dimensions } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { usePopoverContext } from './PopoverContext';
import type { PopoverContentProps } from './Popover.types';
import type { NeobrutalismTheme } from '../theme/types';

const POPOVER_PADDING = 8;

/**
 * Content container for the Popover.
 * Positions itself relative to the trigger.
 *
 * @example
 * ```tsx
 * <PopoverContent>
 *   <Text>Popover content here</Text>
 * </PopoverContent>
 * ```
 */
export function PopoverContent({
  children,
  style,
  overlayStyle,
  animationType = 'fade',
  align = 'center',
  side = 'bottom',
  sideOffset = 4,
  accessibilityLabel,
}: PopoverContentProps): JSX.Element | null {
  const { open, setOpen, triggerLayout, themeOverride } = usePopoverContext();
  const { theme: contextTheme } = useNeobrutalismTheme();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Calculate popover position based on trigger layout
  const popoverPosition = useMemo(() => {
    if (!triggerLayout) return { top: 0, left: 0 };

    const { pageX, pageY, width, height } = triggerLayout;

    let top: number;
    let left: number;

    // Calculate vertical position
    if (side === 'bottom') top = pageY + height + sideOffset;
    else top = pageY - sideOffset; // Will be adjusted after we know content height

    // Calculate horizontal position based on alignment
    switch (align) {
      case 'start':
        left = pageX;
        break;
      case 'end':
        left = pageX + width;
        break;
      case 'center':
      default:
        left = pageX + width / 2;
        break;
    }

    // Ensure doesn't go off screen edges
    if (left < POPOVER_PADDING) left = POPOVER_PADDING;
    if (left > windowWidth - POPOVER_PADDING)
      left = windowWidth - POPOVER_PADDING;
    if (top < POPOVER_PADDING) top = POPOVER_PADDING;
    if (top > windowHeight - POPOVER_PADDING)
      top = windowHeight - POPOVER_PADDING;

    return { top, left };
  }, [triggerLayout, side, sideOffset, align, windowWidth, windowHeight]);

  // Get transform based on alignment
  const alignmentTransform = useMemo(() => {
    switch (align) {
      case 'start':
        return { translateX: 0 };
      case 'end':
        return { translateX: '-100%' };
      case 'center':
      default:
        return { translateX: '-50%' };
    }
  }, [align]);

  // Overlay styles - transparent to capture outside clicks
  const computedOverlayStyle: ViewStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: 'transparent',
    }),
    []
  );

  // Wrapper position styles
  const wrapperStyle: ViewStyle = useMemo(
    () => ({
      position: 'absolute',
      top: popoverPosition.top,
      left: popoverPosition.left,
      transform: [alignmentTransform as { translateX: number | string }],
    }),
    [popoverPosition, alignmentTransform]
  );

  // Shadow styles
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

  // Content container styles
  const contentStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      padding: theme.spacing.md,
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
