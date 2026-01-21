import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, StyleProp } from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

export interface TableProps {
  /** Table content (TableHeader, TableBody) */
  children: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override shadow styles (null to hide) */
  shadowStyle?: StyleProp<ViewStyle> | null;

  /** Component-level theme overrides */
  themeOverride?: NeobrutalismThemeOverride;

  /** Accessibility label */
  accessibilityLabel?: string;
}

export interface TableHeaderProps {
  /** Header content (TableRow with TableHead cells) */
  children: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;
}

export interface TableBodyProps {
  /** Body content (TableRow components) */
  children: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;
}

export interface TableRowProps {
  /** Row cells (TableHead or TableCell) */
  children: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Whether this row is selected */
  selected?: boolean;

  /** Called when row is pressed */
  onPress?: () => void;
}

export interface TableHeadProps {
  /** Header cell content */
  children?: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text styles */
  textStyle?: StyleProp<TextStyle>;

  /** Whether column is sortable */
  sortable?: boolean;

  /** Current sort direction */
  sortDirection?: 'asc' | 'desc' | null;

  /** Called when header is pressed for sorting */
  onSort?: () => void;

  /** Flex value for the column width */
  flex?: number;

  /** Fixed width for the column */
  width?: number;

  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

export interface TableCellProps {
  /** Cell content */
  children?: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text styles */
  textStyle?: StyleProp<TextStyle>;

  /** Flex value for the column width */
  flex?: number;

  /** Fixed width for the column */
  width?: number;

  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

export interface TableContextValue {
  /** Theme overrides */
  themeOverride?: NeobrutalismThemeOverride;
}
