import { useMemo } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import {
  useAccordionContext,
  useAccordionItemContext,
} from './AccordionContext';
import { useAccordionAnimation } from './useAccordionAnimation';
import type { AccordionTriggerProps } from './Accordion.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Default chevron icon component
 */
function ChevronIcon({
  color,
  theme,
}: {
  color: string;
  theme: NeobrutalismTheme;
}): JSX.Element {
  return (
    <Text style={[themeFontStyle(theme), styles.chevronText, { color }]}>▼</Text>
  );
}

/**
 * Trigger component for accordion items.
 *
 * @example
 * ```tsx
 * <AccordionTrigger>Section Title</AccordionTrigger>
 * <AccordionTrigger leftIcon={<Icon name="folder" />}>With Icon</AccordionTrigger>
 * ```
 */
export function AccordionTrigger({
  children,
  leftIcon,
  chevronIcon,
  hideChevron = false,
  style,
  textStyle,
  accessibilityLabel,
}: AccordionTriggerProps): JSX.Element {
  const { themeOverride } = useAccordionContext();
  const { isExpanded, disabled, toggle } = useAccordionItemContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Get animated styles for chevron
  const animationResult = useAccordionAnimation({
    isExpanded,
    duration: 200,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const chevronAnimatedStyle = animationResult.chevronStyle as any;

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.md,
      backgroundColor: disabled ? theme.colors.secondary : theme.colors.primary,
    }),
    [theme.spacing.md, theme.colors.primary, theme.colors.secondary, disabled]
  );

  // Text styles
  const computedTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      color: disabled ? '#888888' : theme.colors.primaryForeground,
      fontSize: 16,
      fontWeight: '600',
      flex: 1,
    }),
    [theme, theme.colors.primaryForeground, disabled]
  );

  const chevronColor = disabled ? '#888888' : theme.colors.primaryForeground;

  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      style={[containerStyle, style]}
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ??
        (typeof children === 'string' ? children : undefined)
      }
      accessibilityState={{ expanded: isExpanded, disabled }}
    >
      {/* Left icon */}
      {leftIcon != null && <View style={styles.leftIcon}>{leftIcon}</View>}

      {/* Label */}
      <View style={styles.labelContainer}>
        {typeof children === 'string' ? (
          <Text style={[computedTextStyle, textStyle]}>{children}</Text>
        ) : (
          children
        )}
      </View>

      {/* Chevron */}
      {!hideChevron && (
        // @ts-expect-error - Reanimated types cause deep instantiation
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <Animated.View style={chevronAnimatedStyle}>
          {chevronIcon ?? <ChevronIcon color={chevronColor} theme={theme} />}
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    marginRight: 12,
  },
  labelContainer: {
    flex: 1,
  },
  chevronText: {
    fontSize: 16,
  },
});
