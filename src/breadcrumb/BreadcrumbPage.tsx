import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, Text } from 'react-native';
import type { TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useBreadcrumbContext } from './BreadcrumbContext';
import type { BreadcrumbPageProps } from './Breadcrumb.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Current page indicator in breadcrumb (non-clickable).
 *
 * @example
 * ```tsx
 * <BreadcrumbPage>Current Page</BreadcrumbPage>
 * ```
 */
export function BreadcrumbPage({
  children,
  style,
  textStyle,
}: BreadcrumbPageProps): JSX.Element {
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

  // Text styles - muted color for current page
  const computedTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.foreground,
      opacity: 0.7,
    }),
    [theme.colors.foreground]
  );

  return (
    <View style={style} accessibilityRole="text" aria-current="page">
      {typeof children === 'string' ? (
        <Text style={[computedTextStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
