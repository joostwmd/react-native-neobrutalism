import type { JSX } from 'react';
import { View } from 'react-native';
import type { TableBodyProps } from './Table.types';

/**
 * Table body section containing data rows.
 *
 * @example
 * ```tsx
 * <TableBody>
 *   <TableRow>
 *     <TableCell>Data 1</TableCell>
 *     <TableCell>Data 2</TableCell>
 *   </TableRow>
 * </TableBody>
 * ```
 */
export function TableBody({ children, style }: TableBodyProps): JSX.Element {
  return <View style={style}>{children}</View>;
}
