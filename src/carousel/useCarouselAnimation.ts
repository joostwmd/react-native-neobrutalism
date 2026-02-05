import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import type { NeobrutalismShadow, NeobrutalismAnimation } from '../theme/types';

export interface UseCarouselAnimationOptions {
  shadow: NeobrutalismShadow;
  animation: NeobrutalismAnimation;
  disabled?: boolean;
}

export interface UseCarouselAnimationReturn {
  translateX: Animated.Value;
  translateY: Animated.Value;
  shadowOpacity: Animated.Value;
  onPressIn: () => void;
  onPressOut: () => void;
}

/**
 * Hook for managing carousel navigation button press animation.
 * Animates button translation and shadow opacity on press.
 */
export function useCarouselAnimation({
  shadow,
  animation,
  disabled = false,
}: UseCarouselAnimationOptions): UseCarouselAnimationReturn {
  // Animated values for translation and shadow
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const shadowOpacity = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback((): void => {
    if (disabled) return;

    // Animate button to "pressed" position (translate to fill shadow gap)
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: shadow.offsetX,
        duration: animation.duration,
        useNativeDriver: animation.useNativeDriver,
      }),
      Animated.timing(translateY, {
        toValue: shadow.offsetY,
        duration: animation.duration,
        useNativeDriver: animation.useNativeDriver,
      }),
      Animated.timing(shadowOpacity, {
        toValue: 0,
        duration: animation.duration,
        useNativeDriver: animation.useNativeDriver,
      }),
    ]).start();
  }, [shadow, animation, disabled, translateX, translateY, shadowOpacity]);

  const onPressOut = useCallback((): void => {
    if (disabled) return;

    // Animate back to default position
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: animation.duration,
        useNativeDriver: animation.useNativeDriver,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: animation.duration,
        useNativeDriver: animation.useNativeDriver,
      }),
      Animated.timing(shadowOpacity, {
        toValue: 1,
        duration: animation.duration,
        useNativeDriver: animation.useNativeDriver,
      }),
    ]).start();
  }, [animation, disabled, translateX, translateY, shadowOpacity]);

  return {
    translateX,
    translateY,
    shadowOpacity,
    onPressIn,
    onPressOut,
  };
}
