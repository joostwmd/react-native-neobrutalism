import { useMemo, useCallback } from 'react';
import type { JSX } from 'react';
import { Modal, View, Pressable, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { deepMerge } from '../utils/mergeStyles';
import { useComboboxContext } from './ComboboxContext';
import type { ComboboxContentProps } from './Combobox.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Dropdown content container for the Combobox.
 * Positions itself below the trigger.
 *
 * @example
 * ```tsx
 * <ComboboxContent>
 *   <ComboboxInput />
 *   <ComboboxList>
 *     <ComboboxItem value="1" label="Option 1" />
 *   </ComboboxList>
 * </ComboboxContent>
 * ```
 */
export function ComboboxContent({
  children,
  style,
  overlayStyle,
  animationType = 'fade',
  maxHeight = 300,
  accessibilityLabel,
}: ComboboxContentProps): JSX.Element | null {
  const { open, setOpen, triggerLayout, themeOverride } = useComboboxContext();
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Calculate dropdown position - always opens below trigger
  const dropdownPosition = useMemo(() => {
    if (!triggerLayout) return { top: 0, left: 0, width: 300 };

    const { pageX, pageY, width, height } = triggerLayout;

    return {
      top: pageY + height + 4, // Always open below
      left: pageX,
      width: width,
    };
  }, [triggerLayout]);

  // Overlay styles - transparent to capture outside clicks
  const computedOverlayStyle: ViewStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: 'transparent',
    }),
    []
  );

  // Content container styles
  const contentStyle: ViewStyle = useMemo(
    () => ({
      position: 'absolute',
      top: dropdownPosition.top,
      left: dropdownPosition.left,
      width: dropdownPosition.width,
      maxHeight,
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor: theme.border.color,
      borderRadius: theme.border.radius,
      overflow: 'hidden',
    }),
    [dropdownPosition, maxHeight, theme]
  );

  // Handle backdrop press
  const handleBackdropPress = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  if (!triggerLayout) return null;

  return (
    <Modal
      visible={open}
      transparent
      animationType={animationType}
      onRequestClose={() => setOpen(false)}
      accessibilityViewIsModal
      accessibilityLabel={accessibilityLabel}
    >
      <Pressable
        style={[computedOverlayStyle, overlayStyle]}
        onPress={handleBackdropPress}
      >
        <View style={styles.dropdownWrapper}>
          <Pressable
            style={[contentStyle, style]}
            onPress={(e) => e.stopPropagation()}
          >
            {children}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  dropdownWrapper: {
    flex: 1,
  },
});
