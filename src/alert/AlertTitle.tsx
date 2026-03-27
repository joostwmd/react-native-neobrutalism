import { useMemo } from 'react';
import type { JSX } from 'react';
import { Text } from 'react-native';
import type { TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useAlertContext } from './AlertContext';
import type { AlertTitleProps, AlertVariant } from './Alert.types';
import type { NeobrutalismTheme, NeobrutalismColors } from '../theme/types';

// Map variant to foreground (text) color keys
const variantForegroundMap: Record<AlertVariant, keyof NeobrutalismColors> = {
  default: 'foreground',
  destructive: 'dangerForeground',
};

/**
 * Title component for Alert.
 *
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 * </Alert>
 * ```
 */
export function AlertTitle({ children, style }: AlertTitleProps): JSX.Element {
  const { variant, themeOverride } = useAlertContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  const textColor = theme.colors[variantForegroundMap[variant]];

  const textStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      color: textColor,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 22,
    }),
    [textColor]
  );

  return <Text style={[textStyle, style]}>{children}</Text>;
}
