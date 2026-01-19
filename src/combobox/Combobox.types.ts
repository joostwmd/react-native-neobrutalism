import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, StyleProp, ModalProps } from 'react-native';
import type { NeobrutalismThemeOverride } from '../theme/types';

export interface ComboboxOption {
  /** Unique value for this option */
  value: string;
  /** Display label */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Optional icon element */
  icon?: ReactNode;
  /** Optional group key for grouping */
  group?: string;
}

export type ComboboxMode = 'single' | 'multiple';

export interface ComboboxProps {
  /** Child components */
  children: ReactNode;

  /** Controlled selected value(s) */
  value?: string | string[];

  /** Default selected value(s) for uncontrolled usage */
  defaultValue?: string | string[];

  /** Callback when selection changes */
  onValueChange?: (value: string | string[]) => void;

  /** Selection mode */
  mode?: ComboboxMode;

  /** Controlled open state */
  open?: boolean;

  /** Default open state */
  defaultOpen?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;

  /** Disable the entire combobox */
  disabled?: boolean;

  /** Placeholder when no selection */
  placeholder?: string;

  /** Search input placeholder */
  searchPlaceholder?: string;

  /** Enable search filtering */
  searchable?: boolean;

  /** Custom filter function */
  filterFn?: (option: ComboboxOption, searchValue: string) => boolean;

  /** Close on selection (default: true for single mode, false for multiple) */
  closeOnSelect?: boolean;

  /** Component-level theme overrides */
  themeOverride?: NeobrutalismThemeOverride;
}

export interface ComboboxTriggerProps {
  /** Custom trigger content */
  children?: ReactNode;

  /** If true, clones child and merges onPress */
  asChild?: boolean;

  /** Show dropdown indicator */
  showIndicator?: boolean;

  /** Custom dropdown icon */
  indicatorIcon?: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text styles */
  textStyle?: StyleProp<TextStyle>;

  /** Override shadow styles, pass null to hide */
  shadowStyle?: StyleProp<ViewStyle> | null;

  /** Accessibility label */
  accessibilityLabel?: string;
}

export interface ComboboxContentProps {
  /** Content children (Input, List, etc.) */
  children: ReactNode;

  /** Override modal content styles */
  style?: StyleProp<ViewStyle>;

  /** Override overlay styles */
  overlayStyle?: StyleProp<ViewStyle>;

  /** Modal animation type */
  animationType?: ModalProps['animationType'];

  /** Maximum height for the dropdown content */
  maxHeight?: number;

  /** Accessibility label */
  accessibilityLabel?: string;
}

export interface ComboboxInputProps {
  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text input styles */
  inputStyle?: StyleProp<TextStyle>;

  /** Custom clear icon */
  clearIcon?: ReactNode;

  /** Show clear button */
  showClear?: boolean;

  /** Placeholder text */
  placeholder?: string;
}

export interface ComboboxListProps {
  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Custom empty state component */
  emptyComponent?: ReactNode;

  /** Maximum number of visible items before scrolling */
  maxVisibleItems?: number;
}

export interface ComboboxItemProps {
  /** Option value */
  value: string;

  /** Option label (display text) */
  label?: string;

  /** Custom content */
  children?: ReactNode;

  /** Disable this item */
  disabled?: boolean;

  /** Icon on the left */
  icon?: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text styles */
  textStyle?: StyleProp<TextStyle>;
}

export interface ComboboxEmptyProps {
  /** Empty state message */
  children?: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override text styles */
  textStyle?: StyleProp<TextStyle>;
}

export interface ComboboxGroupProps {
  /** Group label */
  label: string;

  /** Group items */
  children: ReactNode;

  /** Override container styles */
  style?: StyleProp<ViewStyle>;

  /** Override label styles */
  labelStyle?: StyleProp<TextStyle>;
}

export interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export interface ComboboxContextValue {
  // Selection state
  selectedValues: string[];
  selectValue: (value: string) => void;
  deselectValue: (value: string) => void;
  toggleValue: (value: string) => void;
  isSelected: (value: string) => boolean;
  mode: ComboboxMode;

  // Open state
  open: boolean;
  setOpen: (open: boolean) => void;

  // Search state
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchable: boolean;
  filterFn: (option: ComboboxOption, searchValue: string) => boolean;

  // Options registry
  options: ComboboxOption[];
  registerOption: (option: ComboboxOption) => void;
  unregisterOption: (value: string) => void;

  // Trigger layout for positioning dropdown
  triggerLayout: TriggerLayout | null;
  setTriggerLayout: (layout: TriggerLayout) => void;

  // State
  disabled: boolean;
  placeholder: string;
  searchPlaceholder: string;
  closeOnSelect: boolean;

  // Theme
  themeOverride?: NeobrutalismThemeOverride;
}
