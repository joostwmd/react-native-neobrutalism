import type { TextStyle } from 'react-native';
import type { NeobrutalismTheme } from './types';

/**
 * Merges the theme’s optional `fontFamily` into text styles. Use inside
 * `Text` / `TextInput` style objects so custom fonts apply consistently.
 */
export function themeFontStyle(theme: NeobrutalismTheme): TextStyle {
  if (theme.fontFamily != null && theme.fontFamily !== '') {
    return { fontFamily: theme.fontFamily };
  }
  return {};
}
