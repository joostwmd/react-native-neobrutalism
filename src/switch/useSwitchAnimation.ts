import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import type {
  UseSwitchAnimationOptions,
  UseSwitchAnimationReturn,
} from './Switch.types';

const DEFAULT_DURATION = 150;

/**
 * Animation hook for switch thumb slide and track color using Reanimated.
 *
 * @example
 * ```tsx
 * const { thumbTranslateStyle, trackColorStyle } = useSwitchAnimation({
 *   checked: true,
 *   duration: 200,
 *   thumbMaxTranslate: 22,
 *   trackColorOff: '#FFFFFF',
 *   trackColorOn: '#88AAEE',
 * });
 * ```
 */
export function useSwitchAnimation({
  checked,
  duration = DEFAULT_DURATION,
  thumbMaxTranslate,
  trackColorOff,
  trackColorOn,
}: UseSwitchAnimationOptions): UseSwitchAnimationReturn {
  const progress = useSharedValue(checked ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration,
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    });
  }, [checked, duration, progress]);

  const thumbTranslateStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, thumbMaxTranslate]
          ),
        },
      ],
    } as Record<string, unknown>;
  });

  const trackColorStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [trackColorOff, trackColorOn]
      ),
    } as Record<string, unknown>;
  });

  return {
    thumbTranslateStyle,
    trackColorStyle,
  };
}
