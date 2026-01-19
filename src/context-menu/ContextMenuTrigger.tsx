import { useRef, useCallback, useEffect } from 'react';
import type { JSX } from 'react';
import { Pressable, Platform } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import { useContextMenuContext } from './ContextMenuContext';
import type { ContextMenuTriggerProps } from './ContextMenu.types';

/**
 * Trigger area for the Context Menu.
 * Opens the menu on right-click (web) or long press (native).
 *
 * @example
 * ```tsx
 * <ContextMenuTrigger>
 *   <View style={styles.card}>
 *     <Text>Right-click for options</Text>
 *   </View>
 * </ContextMenuTrigger>
 * ```
 */
export function ContextMenuTrigger({
  children,
  style,
  disabled = false,
  delayLongPress = 500,
  accessibilityLabel,
}: ContextMenuTriggerProps): JSX.Element {
  const { setOpen, setTriggerLayout, setPressPosition } =
    useContextMenuContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const triggerRef = useRef<any>(null);

  // Handle long press (for native platforms)
  const handleLongPress = useCallback(
    (event: GestureResponderEvent) => {
      if (disabled) return;

      // Capture press position for menu positioning
      const { pageX, pageY } = event.nativeEvent;
      setPressPosition({ x: pageX, y: pageY });

      // Measure trigger for fallback positioning
      triggerRef.current?.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pX: number,
          pY: number
        ) => {
          setTriggerLayout({ x, y, width, height, pageX: pX, pageY: pY });
          setOpen(true);
        }
      );
    },
    [disabled, setOpen, setTriggerLayout, setPressPosition]
  );

  // Handle right-click for web
  useEffect(() => {
    if (Platform.OS !== 'web' || disabled) return;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const element = triggerRef.current;
    if (!element) return;

    const handleContextMenu = (event: {
      preventDefault: () => void;
      stopPropagation: () => void;
      clientX: number;
      clientY: number;
    }): void => {
      event.preventDefault();
      event.stopPropagation();

      // Use mouse position directly
      setPressPosition({ x: event.clientX, y: event.clientY });

      // Measure trigger for fallback
      triggerRef.current?.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pX: number,
          pY: number
        ) => {
          setTriggerLayout({ x, y, width, height, pageX: pX, pageY: pY });
          setOpen(true);
        }
      );
    };

    element.addEventListener('contextmenu', handleContextMenu);

    return () => {
      element.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [disabled, setOpen, setTriggerLayout, setPressPosition]);

  return (
    <Pressable
      ref={triggerRef}
      onLongPress={Platform.OS !== 'web' ? handleLongPress : undefined}
      delayLongPress={delayLongPress}
      disabled={disabled}
      style={style}
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ||
        (Platform.OS === 'web'
          ? 'Right-click for context menu'
          : 'Long press for context menu')
      }
      accessibilityState={{ disabled }}
    >
      {children}
    </Pressable>
  );
}
