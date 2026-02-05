import { createContext, useContext } from 'react';
import type { CarouselContextValue } from './Carousel.types';

/**
 * Context for Carousel compound components
 */
export const CarouselContext = createContext<CarouselContextValue | undefined>(
  undefined
);

/**
 * Hook to access Carousel context
 */
export function useCarouselContext(): CarouselContextValue {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(
      'Carousel compound components must be used within a <Carousel> component'
    );
  }
  return context;
}
