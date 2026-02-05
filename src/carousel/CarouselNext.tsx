import { useMemo } from 'react';
import type { JSX } from 'react';
import { Pressable, View, Animated, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useCarouselContext } from './CarouselContext';
import { useCarouselAnimation } from './useCarouselAnimation';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import type { CarouselNextProps } from './Carousel.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Next navigation button for the carousel.
 *
 * @example
 * ```tsx
 * <Carousel>
 *   {items}
 *   <CarouselNext />
 * </Carousel>
 * ```
 */
export function CarouselNext({
  children,
  style,
  shadowStyle,
  accessibilityLabel = 'Next slide',
}: CarouselNextProps): JSX.Element {
  const { goToNext, canScrollNext, orientation, themeOverride } =
    useCarouselContext();

  // Get theme from context
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Animation hook
  const { translateX, translateY, shadowOpacity, onPressIn, onPressOut } =
    useCarouselAnimation({
      shadow: theme.shadow,
      animation: theme.animation,
      disabled: !canScrollNext,
    });

  // Button styles
  const buttonStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      padding: theme.spacing.sm,
      opacity: canScrollNext ? 1 : 0.5,
    }),
    [theme, canScrollNext]
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

  // Position styles based on orientation
  const positionStyle: ViewStyle = useMemo(
    () =>
      orientation === 'horizontal'
        ? {
            position: 'absolute',
            right: theme.spacing.sm,
            top: '50%',
            transform: [{ translateY: -20 }],
          }
        : {
            position: 'absolute',
            bottom: theme.spacing.sm,
            left: '50%',
            transform: [{ translateX: -20 }],
          },
    [orientation, theme.spacing.sm]
  );

  // Default icon based on orientation
  const defaultIcon =
    orientation === 'horizontal' ? (
      <ChevronRightIcon size={20} color={theme.colors.foreground} />
    ) : (
      <ChevronDownIcon size={20} color={theme.colors.foreground} />
    );

  // Determine if shadow should be shown
  const showShadow = shadowStyle !== null && canScrollNext;

  return (
    <View style={[styles.wrapper, positionStyle, style]}>
      {/* Shadow layer */}
      {showShadow && (
        <Animated.View
          style={[computedShadowStyle, shadowStyle, { opacity: shadowOpacity }]}
        />
      )}

      {/* Button */}
      <Pressable
        onPress={goToNext}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={!canScrollNext}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled: !canScrollNext }}
      >
        <Animated.View
          style={[
            buttonStyle,
            {
              transform: [{ translateX }, { translateY }],
            },
          ]}
        >
          {children || defaultIcon}
        </Animated.View>
      </Pressable>
    </View>
  );
}

CarouselNext.displayName = 'CarouselNext';

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 1,
  },
});
