import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import type { BadgeProps, BadgeVariant } from './Badge.types';
import type { NeobrutalismTheme, NeobrutalismColors } from '../theme/types';

// Map variant to background color keys
const variantColorMap: Record<BadgeVariant, keyof NeobrutalismColors> = {
  primary: 'primary',
  secondary: 'secondary',
  warning: 'warning',
  danger: 'danger',
  success: 'success',
  neutral: 'background',
};

// Map variant to foreground (text) color keys
const variantForegroundMap: Record<BadgeVariant, keyof NeobrutalismColors> = {
  primary: 'primaryForeground',
  secondary: 'secondaryForeground',
  warning: 'warningForeground',
  danger: 'dangerForeground',
  success: 'successForeground',
  neutral: 'foreground',
};

/**
 * Neobrutalism styled badge component for displaying status, labels, or tags.
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="success">Success</Badge>
 * <Badge variant="danger" icon={<Icon name="alert" />}>Error</Badge>
 * ```
 */
export function Badge({
  children,
  variant = 'primary',
  icon,
  style,
  textStyle,
  shadowStyle,
  themeOverride,
  accessibilityLabel,
}: BadgeProps): JSX.Element {
  // Get theme from context (or default)
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Compute colors based on variant
  const backgroundColor = theme.colors[variantColorMap[variant]];
  const textColor = theme.colors[variantForegroundMap[variant]];

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      backgroundColor,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    }),
    [backgroundColor, theme.border, theme.spacing]
  );

  // Shadow styles (positioned behind badge)
  const computedShadowStyle: ViewStyle = useMemo(
    () => ({
      position: 'absolute',
      top: theme.shadow.offsetY / 2,
      left: theme.shadow.offsetX / 2,
      right: -theme.shadow.offsetX / 2,
      bottom: -theme.shadow.offsetY / 2,
      backgroundColor: theme.shadow.color,
      borderRadius: theme.border.radius,
    }),
    [theme.shadow, theme.border.radius]
  );

  // Text styles
  const computedTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 12,
      fontWeight: '600',
      color: textColor,
    }),
    [textColor]
  );

  // Determine if shadow should be shown
  const showShadow = shadowStyle !== null;

  return (
    <View style={styles.wrapper} accessibilityLabel={accessibilityLabel}>
      {/* Shadow layer */}
      {showShadow && <View style={[computedShadowStyle, shadowStyle]} />}

      {/* Badge container */}
      <View style={[containerStyle, style]}>
        {/* Icon */}
        {icon != null && <View style={styles.iconContainer}>{icon}</View>}

        {/* Content */}
        {typeof children === 'string' ? (
          <Text style={[computedTextStyle, textStyle]}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
