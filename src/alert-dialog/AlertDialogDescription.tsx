import { useMemo } from 'react';
import type { JSX } from 'react';
import { Text } from 'react-native';
import type { TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useAlertDialogContext } from './AlertDialogContext';
import type { AlertDialogDescriptionProps } from './AlertDialog.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Description component for AlertDialog.
 *
 * @example
 * ```tsx
 * <AlertDialogDescription>
 *   This action cannot be undone. This will permanently delete your account.
 * </AlertDialogDescription>
 * ```
 */
export function AlertDialogDescription({
  children,
  style,
}: AlertDialogDescriptionProps): JSX.Element {
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
      fontSize: 14,
      lineHeight: 20,
      opacity: 0.8,
    }),
    [theme.colors.foreground]
  );

  return <Text style={[textStyle, style]}>{children}</Text>;
}
