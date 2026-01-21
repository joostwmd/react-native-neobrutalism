import { useMemo } from 'react';
import type { JSX } from 'react';
import { Text } from 'react-native';
import type { TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useDialogContext } from './DialogContext';
import type { DialogTitleProps } from './Dialog.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Title component for the Dialog header.
 *
 * @example
 * ```tsx
 * <DialogTitle>Edit Profile</DialogTitle>
 * ```
 */
export function DialogTitle({
  children,
  style,
}: DialogTitleProps): JSX.Element {
  const { themeOverride } = useDialogContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  const titleStyle: TextStyle = useMemo(
    () => ({
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.foreground,
    }),
    [theme.colors.foreground]
  );

  return (
    <Text style={[titleStyle, style]} accessibilityRole="header">
      {children}
    </Text>
  );
}
