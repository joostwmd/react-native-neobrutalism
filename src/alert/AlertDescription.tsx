import { useMemo } from 'react';
import type { JSX } from 'react';
import { Text } from 'react-native';
import type { TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import { useAlertContext } from './AlertContext';
import type { AlertDescriptionProps, AlertVariant } from './Alert.types';
import type { NeobrutalismTheme, NeobrutalismColors } from '../theme/types';

// Map variant to foreground (text) color keys
const variantForegroundMap: Record<AlertVariant, keyof NeobrutalismColors> = {
  default: 'foreground',
  destructive: 'dangerForeground',
};

/**
 * Description component for Alert.
 *
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>You can add components using the CLI.</AlertDescription>
 * </Alert>
 * ```
 */
export function AlertDescription({
  children,
  style,
}: AlertDescriptionProps): JSX.Element {
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
      fontSize: 14,
      lineHeight: 20,
      opacity: 0.9,
    }),
    [textColor]
  );

  return <Text style={[textStyle, style]}>{children}</Text>;
}
