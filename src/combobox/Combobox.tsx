import { useState, useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { View } from 'react-native';
import { ComboboxContext } from './ComboboxContext';
import type {
  ComboboxProps,
  ComboboxContextValue,
  ComboboxOption,
  TriggerLayout,
} from './Combobox.types';

/**
 * Default filter function for combobox options.
 */
function defaultFilterFn(option: ComboboxOption, searchValue: string): boolean {
  return option.label.toLowerCase().includes(searchValue.toLowerCase());
}

/**
 * Root component for a searchable dropdown selection.
 * Use with ComboboxTrigger, ComboboxContent, ComboboxInput, ComboboxList, and ComboboxItem.
 *
 * @example
 * ```tsx
 * // Single select
 * <Combobox value={value} onValueChange={setValue} placeholder="Select a fruit">
 *   <ComboboxTrigger />
 *   <ComboboxContent>
 *     <ComboboxInput />
 *     <ComboboxList>
 *       <ComboboxItem value="apple" label="Apple" />
 *       <ComboboxItem value="banana" label="Banana" />
 *       <ComboboxItem value="orange" label="Orange" />
 *     </ComboboxList>
 *     <ComboboxEmpty>No fruits found</ComboboxEmpty>
 *   </ComboboxContent>
 * </Combobox>
 *
 * // Multi select
 * <Combobox mode="multiple" value={values} onValueChange={setValues}>
 *   <ComboboxTrigger />
 *   <ComboboxContent>
 *     <ComboboxInput />
 *     <ComboboxList>
 *       <ComboboxItem value="react" label="React" />
 *       <ComboboxItem value="vue" label="Vue" />
 *       <ComboboxItem value="angular" label="Angular" />
 *     </ComboboxList>
 *   </ComboboxContent>
 * </Combobox>
 * ```
 */
export function Combobox({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  mode = 'single',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  searchable = true,
  filterFn = defaultFilterFn,
  closeOnSelect,
  themeOverride,
}: ComboboxProps): JSX.Element {
  // Selection state
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue)
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];

    return [];
  });

  // Compute selected values
  const selectedValues = useMemo(() => {
    if (controlledValue !== undefined) {
      return Array.isArray(controlledValue)
        ? controlledValue
        : [controlledValue];
    }
    return internalValue;
  }, [controlledValue, internalValue]);

  // Open state
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  // Search state
  const [searchValue, setSearchValue] = useState('');

  // Options registry
  const [options, setOptions] = useState<ComboboxOption[]>([]);

  // Trigger layout for positioning
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(
    null
  );

  // Determine close on select behavior
  const shouldCloseOnSelect = closeOnSelect ?? mode === 'single';

  // Handle open state changes
  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (disabled) return;
      setInternalOpen(newOpen);
      onOpenChange?.(newOpen);
      // Clear search when closing
      if (!newOpen) setSearchValue('');
    },
    [disabled, onOpenChange]
  );

  // Selection handlers
  const selectValue = useCallback(
    (value: string) => {
      let newValues: string[];
      if (mode === 'single') newValues = [value];
      else newValues = [...selectedValues, value];

      setInternalValue(newValues);
      onValueChange?.(mode === 'single' ? value : newValues);

      if (shouldCloseOnSelect) setOpen(false);
    },
    [mode, selectedValues, shouldCloseOnSelect, onValueChange, setOpen]
  );

  const deselectValue = useCallback(
    (value: string) => {
      const newValues = selectedValues.filter((v) => v !== value);
      setInternalValue(newValues);
      onValueChange?.(mode === 'single' ? '' : newValues);
    },
    [mode, selectedValues, onValueChange]
  );

  const toggleValue = useCallback(
    (value: string) => {
      if (selectedValues.includes(value)) deselectValue(value);
      else selectValue(value);
    },
    [selectedValues, selectValue, deselectValue]
  );

  const isSelected = useCallback(
    (value: string) => selectedValues.includes(value),
    [selectedValues]
  );

  // Option registry handlers
  const registerOption = useCallback((option: ComboboxOption) => {
    setOptions((prev) => {
      // Avoid duplicates
      if (prev.some((o) => o.value === option.value)) return prev;

      return [...prev, option];
    });
  }, []);

  const unregisterOption = useCallback((value: string) => {
    setOptions((prev) => prev.filter((o) => o.value !== value));
  }, []);

  // Memoize context value
  const contextValue = useMemo<ComboboxContextValue>(
    () => ({
      selectedValues,
      selectValue,
      deselectValue,
      toggleValue,
      isSelected,
      mode,
      open,
      setOpen,
      searchValue,
      setSearchValue,
      searchable,
      filterFn,
      options,
      registerOption,
      unregisterOption,
      triggerLayout,
      setTriggerLayout,
      disabled,
      placeholder,
      searchPlaceholder,
      closeOnSelect: shouldCloseOnSelect,
      themeOverride,
    }),
    [
      selectedValues,
      selectValue,
      deselectValue,
      toggleValue,
      isSelected,
      mode,
      open,
      setOpen,
      searchValue,
      searchable,
      filterFn,
      options,
      registerOption,
      unregisterOption,
      triggerLayout,
      disabled,
      placeholder,
      searchPlaceholder,
      shouldCloseOnSelect,
      themeOverride,
    ]
  );

  return (
    <ComboboxContext.Provider value={contextValue}>
      <View>{children}</View>
    </ComboboxContext.Provider>
  );
}
