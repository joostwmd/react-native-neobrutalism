import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import type {
  UseProgressAnimationOptions,
  UseProgressAnimationReturn,
} from './Progress.types';

const DEFAULT_DURATION = 300;

/**
 * Animation hook for progress bar fill using Reanimated.
 *
 * @example
 * ```tsx
 * const { fillStyle } = useProgressAnimation({
 *   value: percentage, // 0-100
 *   indeterminate: false,
 *   duration: 300,
 * });
 * ```
 */
export function useProgressAnimation({
  value,
  indeterminate,
  duration = DEFAULT_DURATION,
}: UseProgressAnimationOptions): UseProgressAnimationReturn {
  const progress = useSharedValue(
    indeterminate ? 0 : Math.min(100, Math.max(0, value)) / 100
  );

  useEffect(() => {
    if (indeterminate) {
      progress.value = withRepeat(
        withSequence(
          withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 0 })
        ),
        -1
      );
    } else {
      const target = Math.min(100, Math.max(0, value)) / 100;
      progress.value = withTiming(target, {
        duration,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
    }
  }, [value, indeterminate, duration, progress]);

  const fillStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      width: `${interpolate(progress.value, [0, 1], [0, 100])}%`,
      height: '100%',
    };
  });

  return { fillStyle };
}
