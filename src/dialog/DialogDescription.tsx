import { useMemo } from 'react';
import type { JSX } from 'react';
import { Text } from 'react-native';
import type { TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useDialogContext } from './DialogContext';
import type { DialogDescriptionProps } from './Dialog.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Description component for the Dialog header.
 *
 * @example
 * ```tsx
 * <DialogDescription>
 *   Make changes to your profile here. Click save when you're done.
 * </DialogDescription>
 * ```
 */
export function DialogDescription({
  children,
  style,
}: DialogDescriptionProps): JSX.Element {
  const { themeOverride } = useDialogContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  const descriptionStyle: TextStyle = useMemo(
    () => ({
      fontSize: 14,
      color: theme.colors.secondaryForeground,
      lineHeight: 20,
    }),
    [theme.colors.secondaryForeground]
  );

  return <Text style={[descriptionStyle, style]}>{children}</Text>;
}
