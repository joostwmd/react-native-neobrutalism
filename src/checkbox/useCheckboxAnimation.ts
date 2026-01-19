import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type {
  UseCheckboxAnimationOptions,
  UseCheckboxAnimationReturn,
} from './Checkbox.types';

const DEFAULT_DURATION = 150;

/**
 * Animation hook for checkbox check indicator using Reanimated.
 *
 * @example
 * ```tsx
 * const { scaleStyle, opacityStyle } = useCheckboxAnimation({
 *   checked: true,
 *   duration: 150,
 * });
 * ```
 */
export function useCheckboxAnimation({
  checked,
  duration = DEFAULT_DURATION,
}: UseCheckboxAnimationOptions): UseCheckboxAnimationReturn {
  const progress = useSharedValue(checked ? 1 : 0);

  // Animate on checked change
  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration,
      easing: Easing.bezier(0.34, 1.56, 0.64, 1), // Spring-like bounce
    });
  }, [checked, duration, progress]);

  // Animated scale style
  const scaleStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ scale: progress.value }],
    };
  });

  // Animated opacity style
  const opacityStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity: progress.value,
    };
  });

  return {
    scaleStyle,
    opacityStyle,
  };
}
