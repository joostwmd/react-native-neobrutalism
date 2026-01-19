import { useState, useCallback, useMemo } from 'react';
import type { JSX } from 'react';
import { View, StyleSheet } from 'react-native';
import type { LayoutChangeEvent, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useCollapsibleContext } from './CollapsibleContext';
import { useCollapsibleAnimation } from './useCollapsibleAnimation';
import type { CollapsibleContentProps } from './Collapsible.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Content component for Collapsible with animated height.
 *
 * @example
 * ```tsx
 * <CollapsibleContent>
 *   <Text>This content will animate in and out</Text>
 * </CollapsibleContent>
 *
 * // Force mount (always keep in tree)
 * <CollapsibleContent forceMount>
 *   <Text>Always mounted content</Text>
 * </CollapsibleContent>
 * ```
 */
export function CollapsibleContent({
  children,
  forceMount = false,
  style,
}: CollapsibleContentProps): JSX.Element | null {
  const { open, themeOverride } = useCollapsibleContext();
  const { theme: contextTheme } = useNeobrutalismTheme();
  const [measured, setMeasured] = useState(false);

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Get animated styles
  const { heightStyle, setContentHeight } = useCollapsibleAnimation({
    isOpen: open,
    duration: theme.animation.duration,
  });

  // Handle content measurement
  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      if (height > 0) {
        setContentHeight(height);
        setMeasured(true);
      }
    },
    [setContentHeight]
  );

  // Content container styles
  const contentStyle: ViewStyle = useMemo(
    () => ({
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
    }),
    [theme.spacing.md, theme.colors.background]
  );

  // Don't render if not open and not force mounted
  if (!open && !forceMount && measured) {
    return (
      <Animated.View style={heightStyle}>
        <View style={[contentStyle, style]}>{children}</View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={heightStyle}>
      {/* Hidden measurement container */}
      {!measured && (
        <View
          style={styles.measureContainer}
          onLayout={handleLayout}
          pointerEvents="none"
        >
          <View style={[contentStyle, style]}>{children}</View>
        </View>
      )}

      {/* Visible content */}
      <View style={[contentStyle, style]}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  measureContainer: {
    position: 'absolute',
    opacity: 0,
    left: 0,
    right: 0,
  },
});
