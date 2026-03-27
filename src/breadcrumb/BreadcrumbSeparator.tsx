import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, Text } from 'react-native';
import type { TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useBreadcrumbContext } from './BreadcrumbContext';
import type { BreadcrumbSeparatorProps } from './Breadcrumb.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Visual divider between breadcrumb items. Defaults to a chevron character.
 *
 * @example
 * ```tsx
 * <BreadcrumbSeparator />
 * <BreadcrumbSeparator>/</BreadcrumbSeparator>
 * ```
 */
export function BreadcrumbSeparator({
  children,
  style,
}: BreadcrumbSeparatorProps): JSX.Element {
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

  // Separator text styles
  const separatorStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 14,
      color: theme.colors.foreground,
      opacity: 0.5,
      marginHorizontal: 2,
    }),
    [theme.colors.foreground]
  );

  // Default separator is a chevron
  const separator = children ?? '›';

  return (
    <View
      style={[{ justifyContent: 'center', alignItems: 'center' }, style]}
      accessibilityRole="none"
      aria-hidden
    >
      {typeof separator === 'string' ? (
        <Text style={separatorStyle}>{separator}</Text>
      ) : (
        separator
      )}
    </View>
  );
}
