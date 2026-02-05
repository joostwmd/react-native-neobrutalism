import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useCarouselContext } from './CarouselContext';
import type { CarouselIndicatorsProps } from './Carousel.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Dot indicators for the carousel showing current position.
 *
 * @example
 * ```tsx
 * <Carousel>
 *   {items}
 *   <CarouselIndicators />
 * </Carousel>
 * ```
 */
export function CarouselIndicators({
  style,
  dotStyle,
  activeDotStyle,
}: CarouselIndicatorsProps): JSX.Element {
  const { itemCount, activeIndex, goToIndex, orientation, themeOverride } =
    useCarouselContext();

  // Get theme from context
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Container styles based on orientation
  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.xs,
      padding: theme.spacing.sm,
    }),
    [orientation, theme.spacing]
  );

  // Position style
  const positionStyle: ViewStyle = useMemo(
    () =>
      orientation === 'horizontal'
        ? {
            position: 'absolute',
            bottom: theme.spacing.sm,
            left: 0,
            right: 0,
          }
        : {
            position: 'absolute',
            right: theme.spacing.sm,
            top: 0,
            bottom: 0,
          },
    [orientation, theme.spacing.sm]
  );

  // Default dot style
  const defaultDotStyle: ViewStyle = useMemo(
    () => ({
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.secondary,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
    }),
    [theme.colors.secondary, theme.border]
  );

  // Active dot style
  const defaultActiveDotStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.primary,
    }),
    [theme.colors.primary]
  );

  // Generate dots
  const dots = useMemo(() => {
    const dotsArray = [];
    for (let i = 0; i < itemCount; i++) {
      const isActive = i === activeIndex;
      dotsArray.push(
        <Pressable
          key={`dot-${i}`}
          onPress={() => goToIndex(i)}
          accessibilityLabel={`Go to slide ${i + 1}`}
          accessibilityRole="button"
          accessibilityState={{ selected: isActive }}
        >
          <View
            style={[
              defaultDotStyle,
              dotStyle,
              isActive && defaultActiveDotStyle,
              isActive && activeDotStyle,
            ]}
          />
        </Pressable>
      );
    }
    return dotsArray;
  }, [
    itemCount,
    activeIndex,
    goToIndex,
    defaultDotStyle,
    dotStyle,
    defaultActiveDotStyle,
    activeDotStyle,
  ]);

  if (itemCount <= 1) return <View />;

  return (
    <View style={[styles.wrapper, positionStyle, containerStyle, style]}>
      {dots}
    </View>
  );
}

CarouselIndicators.displayName = 'CarouselIndicators';

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 1,
  },
});
