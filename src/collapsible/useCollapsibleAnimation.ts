import { useCallback, useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import type {
  UseCollapsibleAnimationOptions,
  UseCollapsibleAnimationReturn,
} from './Collapsible.types';

const DEFAULT_DURATION = 300;

/**
 * Animation hook for collapsible expand/collapse using Reanimated.
 *
 * @example
 * ```tsx
 * const { heightStyle, chevronStyle, setContentHeight } = useCollapsibleAnimation({
 *   isOpen,
 *   duration: 300,
 * });
 * ```
 */
export function useCollapsibleAnimation({
  isOpen,
  duration = DEFAULT_DURATION,
}: UseCollapsibleAnimationOptions): UseCollapsibleAnimationReturn {
  const progress = useSharedValue(isOpen ? 1 : 0);
  const contentHeight = useSharedValue(0);

  // Animate on open change
  useEffect(() => {
    progress.value = withTiming(isOpen ? 1 : 0, {
      duration,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [isOpen, duration, progress]);

  // Animated content height style
  const heightStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      height: interpolate(progress.value, [0, 1], [0, contentHeight.value]),
      overflow: 'hidden',
    };
  });

  // Animated chevron rotation style (180 degrees)
  const chevronStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {
          rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg`,
        },
      ],
    };
  });

  // Set the measured content height
  const setContentHeight = useCallback(
    (height: number) => {
      contentHeight.value = height;
    },
    [contentHeight]
  );

  return {
    heightStyle,
    chevronStyle,
    setContentHeight,
  };
}
