// Theme exports
export {
  NeobrutalismThemeProvider,
  NeobrutalismThemeContext,
  useNeobrutalismTheme,
  defaultTheme,
} from './theme';
export type {
  NeobrutalismTheme,
  NeobrutalismThemeOverride,
  NeobrutalismThemeContextValue,
  NeobrutalismColors,
  NeobrutalismShadow,
  NeobrutalismBorder,
  NeobrutalismSpacing,
  NeobrutalismButtonSize,
  NeobrutalismButtonSizes,
  NeobrutalismAnimation,
  DeepPartial,
} from './theme';

// Button exports
export { Button, useButtonAnimation } from './buttons';
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  UseButtonAnimationOptions,
  UseButtonAnimationReturn,
} from './buttons';

// Alert exports
export { Alert, AlertTitle, AlertDescription } from './alert';
export type {
  AlertProps,
  AlertTitleProps,
  AlertDescriptionProps,
  AlertVariant,
} from './alert';

// Alert Dialog exports
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from './alert-dialog';
export type {
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from './alert-dialog';

// Accordion exports
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useAccordionAnimation,
} from './accordion';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionType,
  UseAccordionAnimationOptions,
  UseAccordionAnimationReturn,
} from './accordion';

// Badge exports
export { Badge } from './badge';
export type { BadgeProps, BadgeVariant } from './badge';

// Breadcrumb exports
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';
export type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
} from './breadcrumb';

// Calendar exports
export {
  Calendar,
  CalendarHeader,
  CalendarDay,
  CalendarGrid,
  CalendarContext,
  useCalendarContext,
} from './calendar';
export type {
  CalendarProps,
  CalendarMode,
  CalendarTone,
  DateRange,
  CalendarContextValue,
  CalendarHeaderProps,
  CalendarDayProps,
  CalendarGridProps,
} from './calendar';

// Card exports
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardContext,
  useCardContext,
} from './card';
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardContextValue,
} from './card';

// Input exports
export { Input, FileInput } from './input';
export type { InputProps, FileInputProps } from './input';

// Checkbox exports
export { Checkbox, useCheckboxAnimation } from './checkbox';
export type {
  CheckboxProps,
  CheckboxSize,
  UseCheckboxAnimationOptions,
  UseCheckboxAnimationReturn,
} from './checkbox';

// Collapsible exports
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleContext,
  useCollapsibleContext,
  useCollapsibleAnimation,
} from './collapsible';
export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
  CollapsibleContextValue,
  UseCollapsibleAnimationOptions,
  UseCollapsibleAnimationReturn,
} from './collapsible';

// Combobox exports
export {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxContext,
  useComboboxContext,
} from './combobox';
export type {
  ComboboxProps,
  ComboboxTriggerProps,
  ComboboxContentProps,
  ComboboxInputProps,
  ComboboxListProps,
  ComboboxItemProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxContextValue,
  ComboboxOption,
  ComboboxMode,
} from './combobox';

// Context Menu exports
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from './context-menu';
export type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuCheckboxItemProps,
  ContextMenuLabelProps,
  ContextMenuSeparatorProps,
} from './context-menu';

// Icon exports
export { CheckIcon, MinusIcon, ChevronDownIcon, XIcon } from './icons';
export type { IconProps } from './icons';

// Utility exports
export { deepMerge } from './utils';
