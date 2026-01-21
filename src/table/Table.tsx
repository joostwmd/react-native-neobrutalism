import { useMemo } from 'react';
import type { JSX } from 'react';
import { View, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { TableContext } from './TableContext';
import type { TableProps, TableContextValue } from './Table.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Table container component with neobrutalism styling.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export function Table({
  children,
  style,
  shadowStyle,
  themeOverride,
  accessibilityLabel = 'Table',
}: TableProps): JSX.Element {
  const { theme: contextTheme } = useNeobrutalismTheme();
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Context value
  const contextValue: TableContextValue = useMemo(
    () => ({
      themeOverride,
    }),
    [themeOverride]
  );

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      overflow: 'hidden',
    }),
    [theme]
  );

  // Shadow styles
  const computedShadowStyle: ViewStyle = useMemo(
    () => ({
      position: 'absolute',
      top: theme.shadow.offsetY,
      left: theme.shadow.offsetX,
      right: -theme.shadow.offsetX,
      bottom: -theme.shadow.offsetY,
      backgroundColor: theme.shadow.color,
      borderRadius: theme.border.radius,
    }),
    [theme.shadow, theme.border.radius]
  );

  const showShadow = shadowStyle !== null;

  return (
    <View
      style={styles.wrapper}
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel}
    >
      {showShadow && <View style={[computedShadowStyle, shadowStyle]} />}
      <TableContext.Provider value={contextValue}>
        <View style={[containerStyle, style]}>{children}</View>
      </TableContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'stretch',
  },
});
