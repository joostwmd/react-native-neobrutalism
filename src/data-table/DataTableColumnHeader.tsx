import { useMemo } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../dropdown-menu';
import type { DataTableColumnHeaderProps } from './DataTable.types';

/**
 * Column header component with sorting and visibility controls.
 *
 * @example
 * ```tsx
 * // In column definition
 * {
 *   accessorKey: 'email',
 *   header: ({ column }) => (
 *     <DataTableColumnHeader column={column} title="Email" />
 *   ),
 * }
 * ```
 */
export function DataTableColumnHeader({
  column,
  title,
  style,
  textStyle,
}: DataTableColumnHeaderProps): JSX.Element {
  const { theme } = useNeobrutalismTheme();

  const isSorted = column.getIsSorted() as false | 'asc' | 'desc';
  const canSort = column.getCanSort() as boolean;
  const canHide = column.getCanHide() as boolean;

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    }),
    []
  );

  // Text styles
  const computedTextStyle: TextStyle = useMemo(
    () => ({
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.foreground,
    }),
    [theme.colors.foreground]
  );

  // Sort indicator
  const sortIndicator = isSorted && (
    <Text style={{ color: theme.colors.foreground }}>
      {isSorted === 'asc' ? '↑' : '↓'}
    </Text>
  );

  // If no sorting or hiding capabilities, just render title
  if (!canSort && !canHide) {
    return (
      <View style={[containerStyle, style]}>
        <Text style={[computedTextStyle, textStyle]}>{title}</Text>
      </View>
    );
  }

  // If only sorting is enabled
  if (canSort && !canHide) {
    return (
      <Pressable
        onPress={() => column.toggleSorting(isSorted === 'asc')}
        style={[containerStyle, style]}
        accessibilityRole="button"
        accessibilityLabel={`Sort by ${title}`}
      >
        <Text style={[computedTextStyle, textStyle]}>{title}</Text>
        {sortIndicator}
      </Pressable>
    );
  }

  // Full dropdown menu with sort and hide options
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <View style={[containerStyle, style]}>
          <Text style={[computedTextStyle, textStyle]}>{title}</Text>
          {sortIndicator}
          <Text
            style={{ color: theme.colors.secondaryForeground, fontSize: 10 }}
          >
            ▼
          </Text>
        </View>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {canSort && (
          <>
            <DropdownMenuItem
              label="Sort Ascending"
              onPress={() => column.toggleSorting(false)}
              icon={<Text>↑</Text>}
            />
            <DropdownMenuItem
              label="Sort Descending"
              onPress={() => column.toggleSorting(true)}
              icon={<Text>↓</Text>}
            />
          </>
        )}
        {canSort && canHide && <DropdownMenuSeparator />}
        {canHide && (
          <DropdownMenuItem
            label="Hide Column"
            onPress={() => column.toggleVisibility(false)}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
