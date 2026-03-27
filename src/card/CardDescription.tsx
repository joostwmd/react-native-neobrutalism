import { useMemo } from 'react';
import type { JSX } from 'react';
import { Text } from 'react-native';
import type { TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useCardContext } from './CardContext';
import type { CardDescriptionProps } from './Card.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Description component for Card.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description text</CardDescription>
 *   </CardHeader>
 * </Card>
 * ```
 */
export function CardDescription({
  children,
  style,
}: CardDescriptionProps): JSX.Element {
  const { themeOverride } = useCardContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  const textStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      color: theme.colors.foreground,
      fontSize: 14,
      lineHeight: 20,
      opacity: 0.7,
    }),
    [theme.colors.foreground]
  );

  return <Text style={[textStyle, style]}>{children}</Text>;
}
