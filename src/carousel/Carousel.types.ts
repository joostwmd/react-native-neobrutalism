import type { ReactNode } from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

/**
 * Carousel orientation options
 */
export type CarouselOrientation = 'horizontal' | 'vertical';

/**
 * Props for the main Carousel component
 */
export interface CarouselProps {
  /** Carousel items */
  children: ReactNode;
  /** Scroll direction */
  orientation?: CarouselOrientation;
  /** Controlled active index */
  activeIndex?: number;
  /** Default active index for uncontrolled mode */
  defaultActiveIndex?: number;
  /** Callback when active index changes */
  onActiveIndexChange?: (index: number) => void;
  /** Enable automatic slide advancement */
  autoPlay?: boolean;
  /** Interval for auto-play in milliseconds */
  autoPlayInterval?: number;
  /** Enable infinite loop */
  loop?: boolean;
  /** Size of each item (width for horizontal, height for vertical) */
  itemSize?: number;
  /** Gap between items */
  itemGap?: number;
  /** Additional container styles */
  style?: StyleProp<ViewStyle>;
  /** Shadow layer styles */
  shadowStyle?: StyleProp<ViewStyle> | null;
  /** Theme overrides */
  themeOverride?: NeobrutalismThemeOverride;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * Props for CarouselItem component
 */
export interface CarouselItemProps {
  /** Item content */
  children: ReactNode;
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
}

/**
 * Props for CarouselPrevious component
 */
export interface CarouselPreviousProps {
  /** Custom button content */
  children?: ReactNode;
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
  /** Shadow layer styles */
  shadowStyle?: StyleProp<ViewStyle> | null;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * Props for CarouselNext component
 */
export interface CarouselNextProps {
  /** Custom button content */
  children?: ReactNode;
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
  /** Shadow layer styles */
  shadowStyle?: StyleProp<ViewStyle> | null;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * Props for CarouselIndicators component
 */
export interface CarouselIndicatorsProps {
  /** Container styles */
  style?: StyleProp<ViewStyle>;
  /** Default dot styles */
  dotStyle?: StyleProp<ViewStyle>;
  /** Active dot styles */
  activeDotStyle?: StyleProp<ViewStyle>;
}

/**
 * Context value for carousel sub-components
 */
export interface CarouselContextValue {
  /** Total number of items */
  itemCount: number;
  /** Current active index */
  activeIndex: number;
  /** Navigate to specific index */
  goToIndex: (index: number) => void;
  /** Navigate to previous item */
  goToPrevious: () => void;
  /** Navigate to next item */
  goToNext: () => void;
  /** Whether can scroll to previous */
  canScrollPrev: boolean;
  /** Whether can scroll to next */
  canScrollNext: boolean;
  /** Current orientation */
  orientation: CarouselOrientation;
  /** Whether loop is enabled */
  loop: boolean;
  /** Theme overrides from parent */
  themeOverride?: NeobrutalismThemeOverride;
  /** Item size */
  itemSize: number;
  /** Item gap */
  itemGap: number;
}
