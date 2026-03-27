import { useMemo } from 'react';
import type { JSX } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useNeobrutalismTheme } from '../theme/useNeobrutalismTheme';
import { themeFontStyle } from '../theme/themeFontStyle';
import { deepMerge } from '../utils/mergeStyles';
import type { FileInputProps } from './FileInput.types';
import type { NeobrutalismTheme } from '../theme/types';

/**
 * Neobrutalism styled file input component.
 * Connect to your preferred file picker library via the onPress prop.
 *
 * @example
 * ```tsx
 * import * as DocumentPicker from 'expo-document-picker';
 *
 * const [fileName, setFileName] = useState<string>();
 *
 * const handlePickFile = async () => {
 *   const result = await DocumentPicker.getDocumentAsync();
 *   if (result.type === 'success') {
 *     setFileName(result.name);
 *   }
 * };
 *
 * <FileInput
 *   placeholder="Choose a file"
 *   value={fileName}
 *   onPress={handlePickFile}
 * />
 * ```
 */
export function FileInput({
  placeholder = 'No file chosen',
  value,
  onPress,
  disabled = false,
  error = false,
  fullWidth = false,
  icon,
  style,
  textStyle,
  themeOverride,
  accessibilityLabel,
}: FileInputProps): JSX.Element {
  // Get theme from context (or default)
  const { theme: contextTheme } = useNeobrutalismTheme();

  // Merge component-level overrides
  const theme: NeobrutalismTheme = useMemo(
    () =>
      themeOverride ? deepMerge(contextTheme, themeOverride) : contextTheme,
    [contextTheme, themeOverride]
  );

  // Determine border color based on state
  const borderColor = useMemo(() => {
    if (error) return theme.colors.danger;
    return theme.border.color;
  }, [error, theme.colors.danger, theme.border.color]);

  // Container styles
  const containerStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.background,
      borderWidth: theme.border.width,
      borderColor,
      borderRadius: theme.border.radius,
      opacity: disabled ? 0.5 : 1,
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 44,
    }),
    [theme.colors.background, theme.border, borderColor, disabled]
  );

  // Button styles (left side)
  const buttonStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.secondary,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRightWidth: theme.border.width,
      borderRightColor: theme.border.color,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      alignSelf: 'stretch',
      justifyContent: 'center',
    }),
    [theme.colors.secondary, theme.spacing, theme.border]
  );

  // Button text styles
  const buttonTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.secondaryForeground,
    }),
    [theme.colors.secondaryForeground]
  );

  // Value/placeholder text styles
  const valueTextStyle: TextStyle = useMemo(
    () => ({
      ...themeFontStyle(theme),
      flex: 1,
      paddingHorizontal: theme.spacing.md,
      fontSize: 14,
      color: value ? theme.colors.foreground : `${theme.colors.foreground}80`,
    }),
    [theme.spacing, theme.colors.foreground, value]
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? 'Choose file'}
      accessibilityState={{ disabled }}
      style={[containerStyle, fullWidth && styles.fullWidth, style]}
    >
      <View style={buttonStyle}>
        {icon != null && <View>{icon}</View>}
        <Text style={buttonTextStyle}>Choose File</Text>
      </View>
      <Text style={[valueTextStyle, textStyle]} numberOfLines={1}>
        {value ?? placeholder}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    alignSelf: 'stretch',
  },
});
