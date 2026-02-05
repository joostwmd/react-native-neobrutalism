import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  Children,
} from 'react';
import type { JSX, ReactNode } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import type {
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItemInfo,
} from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { CarouselContext } from './CarouselContext';
import type { CarouselProps, CarouselContextValue } from './Carousel.types';
import type { NeobrutalismTheme } from '../theme/types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Neobrutalism styled carousel component with FlatList and native animations.
 *
 * @example
 * ```tsx
 * <Carousel>
 *   <CarouselItem>
 *     <Image source={{ uri: 'image1.jpg' }} style={{ width: '100%', height: 200 }} />
 *   </CarouselItem>
 *   <CarouselItem>
 *     <Image source={{ uri: 'image2.jpg' }} style={{ width: '100%', height: 200 }} />
 *   </CarouselItem>
 *   <CarouselPrevious />
 *   <CarouselNext />
 *   <CarouselIndicators />
 * </Carousel>
 * ```
 */
export function Carousel({
  children,
  orientation = 'horizontal',
  activeIndex: controlledActiveIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  autoPlay = false,
  autoPlayInterval = 3000,
  loop = false,
  itemSize,
  itemGap = 0,
  style,
  shadowStyle,
  themeOverride,
  accessibilityLabel,
}: CarouselProps): JSX.Element {
  // Internal state for uncontrolled mode
  const [internalActiveIndex, setInternalActiveIndex] =
    useState(defaultActiveIndex);

  // Use controlled value if provided, otherwise use internal state
  const activeIndex = controlledActiveIndex ?? internalActiveIndex;

  // FlatList ref for programmatic scrolling
  const flatListRef = useRef<FlatList>(null);

  // Get theme from context (or default)
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Compute item size based on orientation
  const computedItemSize = useMemo(() => {
    if (itemSize) return itemSize;
    return orientation === 'horizontal' ? SCREEN_WIDTH : SCREEN_HEIGHT * 0.4;
  }, [itemSize, orientation]);

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      overflow: 'hidden',
    }),
    [theme.colors.background, theme.border]
  );

  // Shadow styles (positioned behind carousel)
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

  // Extract CarouselItem children for FlatList
  const carouselItems = useMemo(() => {
    const items: ReactNode[] = [];
    Children.forEach(children, (child) => {
      if (child && typeof child === 'object' && 'type' in child) {
        // Check if it's a CarouselItem by name
        const componentName =
          typeof child.type === 'function'
            ? child.type.name ||
              (child.type as { displayName?: string }).displayName
            : '';
        if (componentName === 'CarouselItem') items.push(child);
      }
    });
    return items;
  }, [children]);

  // Extract non-item children (navigation, indicators, etc.)
  const otherChildren = useMemo(() => {
    const others: ReactNode[] = [];
    Children.forEach(children, (child) => {
      if (child && typeof child === 'object' && 'type' in child) {
        const componentName =
          typeof child.type === 'function'
            ? child.type.name ||
              (child.type as { displayName?: string }).displayName
            : '';
        if (componentName !== 'CarouselItem') others.push(child);
      } else if (child) {
        others.push(child);
      }
    });
    return others;
  }, [children]);

  // Use carouselItems length for itemCount
  const actualItemCount = carouselItems.length;

  // Navigation functions
  const goToIndex = useCallback(
    (index: number) => {
      let targetIndex = index;

      if (loop) {
        if (index < 0) targetIndex = actualItemCount - 1;
        else if (index >= actualItemCount) targetIndex = 0;
      } else {
        targetIndex = Math.max(0, Math.min(index, actualItemCount - 1));
      }

      setInternalActiveIndex(targetIndex);
      onActiveIndexChange?.(targetIndex);

      flatListRef.current?.scrollToIndex({
        index: targetIndex,
        animated: true,
      });
    },
    [actualItemCount, loop, onActiveIndexChange]
  );

  const goToPrevious = useCallback(() => {
    goToIndex(activeIndex - 1);
  }, [activeIndex, goToIndex]);

  const goToNext = useCallback(() => {
    goToIndex(activeIndex + 1);
  }, [activeIndex, goToIndex]);

  // Can scroll calculations
  const canScrollPrev = useMemo(() => {
    if (loop) return actualItemCount > 1;
    return activeIndex > 0;
  }, [loop, activeIndex, actualItemCount]);

  const canScrollNext = useMemo(() => {
    if (loop) return actualItemCount > 1;
    return activeIndex < actualItemCount - 1;
  }, [loop, activeIndex, actualItemCount]);

  // Handle scroll end to sync active index
  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset =
        orientation === 'horizontal'
          ? event.nativeEvent.contentOffset.x
          : event.nativeEvent.contentOffset.y;

      const newIndex = Math.round(offset / (computedItemSize + itemGap));
      const clampedIndex = Math.max(0, Math.min(newIndex, actualItemCount - 1));

      if (clampedIndex !== activeIndex) {
        setInternalActiveIndex(clampedIndex);
        onActiveIndexChange?.(clampedIndex);
      }
    },
    [
      orientation,
      computedItemSize,
      itemGap,
      actualItemCount,
      activeIndex,
      onActiveIndexChange,
    ]
  );

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || actualItemCount <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, actualItemCount, goToNext]);

  // Context value for child components
  const contextValue = useMemo<CarouselContextValue>(
    () => ({
      itemCount: actualItemCount,
      activeIndex,
      goToIndex,
      goToPrevious,
      goToNext,
      canScrollPrev,
      canScrollNext,
      orientation,
      loop,
      themeOverride,
      itemSize: computedItemSize,
      itemGap,
    }),
    [
      actualItemCount,
      activeIndex,
      goToIndex,
      goToPrevious,
      goToNext,
      canScrollPrev,
      canScrollNext,
      orientation,
      loop,
      themeOverride,
      computedItemSize,
      itemGap,
    ]
  );

  // Render item for FlatList
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ReactNode>) => (
      <View
        style={{
          width: orientation === 'horizontal' ? computedItemSize : undefined,
          height: orientation === 'vertical' ? computedItemSize : undefined,
          marginRight:
            orientation === 'horizontal' && itemGap > 0 ? itemGap : undefined,
          marginBottom:
            orientation === 'vertical' && itemGap > 0 ? itemGap : undefined,
        }}
      >
        {item}
      </View>
    ),
    [orientation, computedItemSize, itemGap]
  );

  // Key extractor
  const keyExtractor = useCallback(
    (_item: ReactNode, index: number) => `carousel-item-${index}`,
    []
  );

  // Get item layout for better performance
  const getItemLayout = useCallback(
    (_data: ArrayLike<ReactNode> | null | undefined, index: number) => ({
      length: computedItemSize + itemGap,
      offset: (computedItemSize + itemGap) * index,
      index,
    }),
    [computedItemSize, itemGap]
  );

  // Determine if shadow should be shown
  const showShadow = shadowStyle !== null;

  return (
    <View style={styles.wrapper} accessibilityLabel={accessibilityLabel}>
      {/* Shadow layer */}
      {showShadow && <View style={[computedShadowStyle, shadowStyle]} />}

      {/* Carousel container */}
      <CarouselContext.Provider value={contextValue}>
        <View style={[containerStyle, style]}>
          <FlatList
            ref={flatListRef}
            data={carouselItems}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal={orientation === 'horizontal'}
            pagingEnabled={!itemGap}
            snapToInterval={itemGap ? computedItemSize + itemGap : undefined}
            snapToAlignment="start"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            getItemLayout={getItemLayout}
            initialScrollIndex={defaultActiveIndex}
            contentContainerStyle={
              orientation === 'vertical' ? styles.verticalContent : undefined
            }
          />
        </View>

        {/* Other children (navigation, indicators, etc.) */}
        {otherChildren}
      </CarouselContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  verticalContent: {
    flexGrow: 1,
  },
});
