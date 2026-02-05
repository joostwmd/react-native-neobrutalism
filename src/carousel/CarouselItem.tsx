import type { JSX } from 'react';
import { View, StyleSheet } from 'react-native';
import type { CarouselItemProps } from './Carousel.types';

/**
 * Individual carousel slide wrapper component.
 *
 * @example
 * ```tsx
 * <CarouselItem>
 *   <Image source={{ uri: 'image.jpg' }} style={{ width: '100%', height: 200 }} />
 * </CarouselItem>
 * ```
 */
export function CarouselItem({
  children,
  style,
}: CarouselItemProps): JSX.Element {
  return <View style={[styles.container, style]}>{children}</View>;
}

// Set display name for component detection in Carousel
CarouselItem.displayName = 'CarouselItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
