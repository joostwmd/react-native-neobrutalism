import React, { useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useCollapsibleContext } from './CollapsibleContext';
import { useCollapsibleAnimation } from './useCollapsibleAnimation';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import type { CollapsibleTriggerProps } from './Collapsible.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Trigger button for the Collapsible component.
 *
 * @example
 * ```tsx
 * // Default trigger with text
 * <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
 *
 * // Custom trigger using asChild
 * <CollapsibleTrigger asChild>
 *   <Button label="Toggle" />
 * </CollapsibleTrigger>
 *
 * // Without chevron
 * <CollapsibleTrigger showChevron={false}>
 *   <Text>Simple trigger</Text>
 * </CollapsibleTrigger>
 * ```
 */
export function CollapsibleTrigger({
  children,
  asChild = false,
  showChevron = true,
  chevronIcon,
  style,
  textStyle,
  accessibilityLabel,
}: CollapsibleTriggerProps): JSX.Element {
  const { open, setOpen, disabled, themeOverride } = useCollapsibleContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Get chevron animation
  const { chevronStyle } = useCollapsibleAnimation({
    isOpen: open,
    duration: theme.animation.duration,
  });

  // Handle press
  const handlePress = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  // Trigger container styles
  const triggerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      opacity: disabled ? 0.5 : 1,
    }),
    [theme, disabled]
  );

  // Text styles
  const computedTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.foreground,
    }),
    [theme.colors.foreground]
  );

  // If asChild, clone child and merge onPress
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onPress?: () => void;
      accessibilityRole?: string;
      accessibilityState?: object;
      accessibilityLabel?: string;
    }>;

    return React.cloneElement(child, {
      onPress: handlePress,
      accessibilityRole: 'button',
      accessibilityState: { expanded: open, disabled },
      accessibilityLabel: accessibilityLabel ?? child.props.accessibilityLabel,
    });
  }

  // Render default trigger
  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ expanded: open, disabled }}
      accessibilityLabel={accessibilityLabel}
      style={[triggerStyle, style]}
    >
      <View style={styles.contentWrapper}>
        {typeof children === 'string' ? (
          <Text style={[computedTextStyle, textStyle]}>{children}</Text>
        ) : (
          children
        )}
      </View>

      {showChevron && (
        <Animated.View style={chevronStyle}>
          {chevronIcon ?? (
            <ChevronDownIcon size={20} color={theme.colors.foreground} />
          )}
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
});
