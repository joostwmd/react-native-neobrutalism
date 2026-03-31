import type { NeobrutalismTheme } from './types';

/**
 * Default Neobrutalism theme based on neobrutalism.dev guidelines
 */
export const defaultTheme: NeobrutalismTheme = {
  colors: {
    // Primary - Bright blue
    primary: '#88AAEE',
    primaryForeground: '#000000',

    // Secondary - Light gray/neutral
    secondary: '#E0E0E0',
    secondaryForeground: '#000000',

    // Disabled Button — darker than `secondary` for clearer muted state
    disabled: '#AEAEB2',
    disabledForeground: '#000000',

    // Warning - Bright yellow/amber
    warning: '#FFDC58',
    warningForeground: '#000000',

    // Danger - Bright red
    danger: '#FF6B6B',
    dangerForeground: '#000000',

    // Success - Bright green
    success: '#A3E635',
    successForeground: '#000000',

    // Base colors
    background: '#FFFFFF',
    foreground: '#000000',
    border: '#000000',
  },

  shadow: {
    offsetX: 4,
    offsetY: 4,
    color: '#000000',
  },

  border: {
    width: 2,
    color: '#000000',
    radius: 5, // Slight curve for softer neobrutalism look
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },

  buttonSizes: {
    small: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      fontSize: 14,
      minHeight: 36,
    },
    default: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: 16,
      minHeight: 40,
    },
    large: {
      paddingHorizontal: 32,
      paddingVertical: 12,
      fontSize: 18,
      minHeight: 44,
    },
  },

  animation: {
    duration: 100, // Fast, snappy animation
    useNativeDriver: true, // Better performance
  },
};
