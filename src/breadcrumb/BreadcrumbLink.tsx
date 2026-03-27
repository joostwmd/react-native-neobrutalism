import { useMemo } from 'react';
import type { JSX } from 'react';
import { Pressable, Text } from 'react-native';
import type { TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useBreadcrumbContext } from './BreadcrumbContext';
import type { BreadcrumbLinkProps } from './Breadcrumb.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Clickable navigation link within a breadcrumb.
 *
 * @example
 * ```tsx
 * <BreadcrumbLink onPress={() => navigate('/home')}>Home</BreadcrumbLink>
 * ```
 */
export function BreadcrumbLink({
  children,
  onPress,
  disabled = false,
  style,
  textStyle,
}: BreadcrumbLinkProps): JSX.Element {
  const breadcrumbContext = useBreadcrumbContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge theme overrides from parent Breadcrumb
  const theme: NeobrutalismTheme = useMemo(
    () =>
      breadcrumbContext?.themeOverride
        ? deepMerge(contextTheme, breadcrumbContext.themeOverride)
        : contextTheme,
    [contextTheme, breadcrumbContext?.themeOverride]
  );

  // Text styles
  const computedTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.foreground,
      opacity: disabled ? 0.5 : 1,
    }),
    [theme.colors.foreground, disabled]
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [style, { opacity: pressed ? 0.7 : 1 }]}
      accessibilityRole="link"
      accessibilityState={{ disabled }}
    >
      {typeof children === 'string' ? (
        <Text style={[computedTextStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
