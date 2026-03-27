import { useMemo } from 'react';
import type { JSX } from 'react';
import { Text } from 'react-native';
import type { TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useAlertDialogContext } from './AlertDialogContext';
import type { AlertDialogTitleProps } from './AlertDialog.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Title component for AlertDialog.
 *
 * @example
 * ```tsx
 * <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 * ```
 */
export function AlertDialogTitle({
  children,
  style,
}: AlertDialogTitleProps): JSX.Element {
  const { themeOverride } = useAlertDialogContext();
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
      fontWeight: '600',
      fontSize: 18,
      lineHeight: 24,
    }),
    [theme.colors.foreground]
  );

  return (
    <Text style={[textStyle, style]} accessibilityRole="header">
      {children}
    </Text>
  );
}
